/**
 * MBC Pro Sensors - common I2C protocol v2 for micro:bit V1 / V2.
 * Protocol: https://mbc-pro-sensors.github.io/i2c-protocol
 *
 * Read:  write [id] -> wait 2 ms -> read 2*k bytes = k consecutive int16 little-endian values.
 *        Undefined ids read as -32768.
 * Write: write [id][params...] (ids E0~EE, F8 = change address, EF = reboot).
 * Common ids: F0 device id, F1 protocol version (2), F2 firmware version,
 *             F3 status flags (bit0 = ready), F4 update counter, F5 uptime seconds.
 */

//% color="#00A4E4" weight=90 icon="" block="MBC Sensors"
//% groups='["Line", "Distance", "Gamepad", "IMU", "Camera", "Device"]'
namespace mbc {
    /** factory I2C addresses (= low byte of F0) */
    export const ADDR_LINE = 0x16
    export const ADDR_TOF = 0x29
    export const ADDR_PAD = 0x42
    export const ADDR_IMU = 0x6A
    export const ADDR_CAM = 0x4C

    /** value returned when a device is missing or the id is undefined */
    export const NONE = -32768

    const ID_DEVICE_ID = 0xF0
    const ID_PROTO_VER = 0xF1
    const ID_FW_VER = 0xF2
    const ID_STATUS = 0xF3
    const ID_SEQ = 0xF4
    const ID_UPTIME = 0xF5
    const CMD_SET_ADDR = 0xF8
    const CMD_REBOOT = 0xEF

    /**
     * Read k consecutive int16 values (little-endian) starting at value id.
     * Returns a 2*k byte buffer; every value is -32768 when the device does not answer.
     * @param addr I2C address
     * @param id first value id (0x01..0xF5)
     * @param k number of values, 1..16
     */
    export function readValues(addr: number, id: number, k: number): Buffer {
        k = Math.constrain(k | 0, 1, 16)
        const cmd = pins.createBuffer(1)
        cmd[0] = id & 0xFF
        const r = pins.i2cWriteBuffer(addr, cmd, false)
        basic.pause(2)   // ESP32 products (PS4, camera) cannot clock-stretch
        if (r) {         // hardware: non-zero = no ACK (simulator returns undefined)
            const miss = pins.createBuffer(2 * k)
            for (let i = 0; i < k; i++) miss.setNumber(NumberFormat.Int16LE, 2 * i, NONE)
            return miss
        }
        return pins.i2cReadBuffer(addr, 2 * k, false)
    }

    /**
     * Read one int16 value. Returns -32768 when the device is missing.
     * @param addr I2C address
     * @param id value id
     */
    export function readValue(addr: number, id: number): number {
        return readValues(addr, id, 1).getNumber(NumberFormat.Int16LE, 0)
    }

    /**
     * Write a command: [id][params...].
     * @param addr I2C address
     * @param id command id (0xE0..0xEE, 0xF8, 0xEF)
     * @param params parameter bytes (each 0..255)
     */
    export function writeCmd(addr: number, id: number, params: number[]): void {
        const b = pins.createBuffer(1 + params.length)
        b[0] = id & 0xFF
        for (let i = 0; i < params.length; i++) b[1 + i] = params[i] & 0xFF
        pins.i2cWriteBuffer(addr, b, false)
    }

    /** True when the value is a real reading (device present, id defined). */
    export function isValid(v: number): boolean {
        return v != NONE
    }

    /**
     * I2C address picker (factory addresses); any number can be typed as well.
     */
    //% blockId=mbc_addr_picker block="$addr" blockHidden=true
    //% addr.fieldEditor="numberdropdown" addr.fieldOptions.decompileLiterals=true
    //% addr.fieldOptions.data='[["0x16 line follower", 22], ["0x29 distance", 41], ["0x42 gamepad", 66], ["0x6A IMU", 106], ["0x4C camera", 76]]'
    export function __addrPicker(addr: number): number {
        return addr
    }

    /**
     * True when the device at this address answers and reports ready (F3 bit0).
     * @param addr I2C address
     */
    //% blockId=mbc_device_ready block="device at %addr is ready"
    //% addr.shadow="mbc_addr_picker"
    //% group="Device" weight=30 advanced=true
    export function deviceReady(addr: number): boolean {
        const s = readValue(addr, ID_STATUS)
        return s != NONE && (s & 0x01) == 1
    }

    /**
     * Wait until the device is ready, up to timeout ms. Returns false on timeout.
     * @param addr I2C address
     * @param timeout maximum wait in ms, eg: 5000
     */
    //% blockId=mbc_wait_ready block="wait for device at %addr ready, timeout %timeout ms"
    //% addr.shadow="mbc_addr_picker" timeout.min=0 timeout.max=60000 timeout.defl=5000
    //% group="Device" weight=29 advanced=true
    export function waitReady(addr: number, timeout: number): boolean {
        const t0 = control.millis()
        while (true) {
            if (deviceReady(addr)) return true
            if (control.millis() - t0 >= timeout) return false
            basic.pause(50)
        }
    }

    /**
     * Factory I2C address of the device (F0 low byte), unchanged after re-addressing.
     * @param addr I2C address
     */
    //% blockId=mbc_device_id block="device at %addr factory id"
    //% addr.shadow="mbc_addr_picker"
    //% group="Device" weight=28 advanced=true
    export function deviceId(addr: number): number {
        const v = readValue(addr, ID_DEVICE_ID)
        return v == NONE ? 0 : (v & 0xFF)
    }

    /**
     * Device kind (F0 high byte): line follower = channels (8/16), distance = sensors (2/8),
     * gamepad 1 = PS2 / 2 = PS4, IMU = 1, camera 1 = school / 2 = WRO.
     * @param addr I2C address
     */
    //% blockId=mbc_device_kind block="device at %addr kind"
    //% addr.shadow="mbc_addr_picker"
    //% group="Device" weight=27 advanced=true
    export function deviceKind(addr: number): number {
        const v = readValue(addr, ID_DEVICE_ID)
        return v == NONE ? 0 : ((v >> 8) & 0xFF)
    }

    /**
     * Protocol version (F1), 2 for this extension.
     * @param addr I2C address
     */
    //% blockId=mbc_protocol_version block="device at %addr protocol version"
    //% addr.shadow="mbc_addr_picker"
    //% group="Device" weight=26 advanced=true
    export function protocolVersion(addr: number): number {
        const v = readValue(addr, ID_PROTO_VER)
        return v == NONE ? 0 : v
    }

    /**
     * Firmware version as "major.minor" (F2 = major*100 + minor). Empty when no device.
     * @param addr I2C address
     */
    //% blockId=mbc_firmware_version block="device at %addr firmware version"
    //% addr.shadow="mbc_addr_picker"
    //% group="Device" weight=25 advanced=true
    export function firmwareVersion(addr: number): string {
        const v = readValue(addr, ID_FW_VER)
        if (v == NONE) return ""
        return Math.idiv(v, 100) + "." + (v % 100)
    }

    /**
     * Status flags byte (F3). bit0 = ready; other bits depend on the product.
     * @param addr I2C address
     */
    //% blockId=mbc_status block="device at %addr status flags"
    //% addr.shadow="mbc_addr_picker"
    //% group="Device" weight=24 advanced=true
    export function status(addr: number): number {
        const v = readValue(addr, ID_STATUS)
        return v == NONE ? 0 : (v & 0xFF)
    }

    /**
     * True when status bit (0..7) is set.
     * @param addr I2C address
     * @param bit bit number 0..7, eg: 1
     */
    //% blockId=mbc_status_bit block="device at %addr status bit %bit"
    //% addr.shadow="mbc_addr_picker" bit.min=0 bit.max=7 bit.defl=1
    //% group="Device" weight=23 advanced=true
    export function statusBit(addr: number, bit: number): boolean {
        bit = Math.constrain(bit | 0, 0, 7)
        return ((status(addr) >> bit) & 1) == 1
    }

    /**
     * Update counter (F4): +1 every 10 ms, wraps at 255. Frozen = module busy.
     * @param addr I2C address
     */
    //% blockId=mbc_update_counter block="device at %addr update counter"
    //% addr.shadow="mbc_addr_picker"
    //% group="Device" weight=22 advanced=true
    export function updateCounter(addr: number): number {
        const v = readValue(addr, ID_SEQ)
        return v == NONE ? 0 : (v & 0xFF)
    }

    /**
     * Seconds since the device booted (F5), stops at 32767.
     * @param addr I2C address
     */
    //% blockId=mbc_uptime block="device at %addr uptime (s)"
    //% addr.shadow="mbc_addr_picker"
    //% group="Device" weight=21 advanced=true
    export function uptime(addr: number): number {
        const v = readValue(addr, ID_UPTIME)
        return v == NONE ? 0 : v
    }

    /**
     * Change the I2C address (F8 [new][~new]), saved to EEPROM; takes effect after reboot.
     * @param addr current I2C address
     * @param newAddr new address 0x08..0x77
     */
    //% blockId=mbc_change_address block="change device at %addr to address %newAddr"
    //% addr.shadow="mbc_addr_picker" newAddr.min=8 newAddr.max=119 newAddr.defl=23
    //% group="Device" weight=12 advanced=true
    export function changeAddress(addr: number, newAddr: number): void {
        newAddr = Math.constrain(newAddr | 0, 0x08, 0x77)
        writeCmd(addr, CMD_SET_ADDR, [newAddr, (~newAddr) & 0xFF])
    }

    /**
     * Restore the factory I2C address (F8 [0x00][0xFF]); takes effect after reboot.
     * @param addr current I2C address
     */
    //% blockId=mbc_reset_address block="restore factory address of device at %addr"
    //% addr.shadow="mbc_addr_picker"
    //% group="Device" weight=11 advanced=true
    export function resetAddress(addr: number): void {
        writeCmd(addr, CMD_SET_ADDR, [0x00, 0xFF])
    }

    /**
     * Reboot the device (EF A5).
     * @param addr I2C address
     */
    //% blockId=mbc_reboot block="reboot device at %addr"
    //% addr.shadow="mbc_addr_picker"
    //% group="Device" weight=10 advanced=true
    export function reboot(addr: number): void {
        writeCmd(addr, CMD_REBOOT, [0xA5])
    }
}
