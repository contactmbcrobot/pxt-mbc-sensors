/**
 * MBC distance sensor 8-ch (I2C 0x29), protocol v2 value table:
 * 01 nearest cm, 02 nearest direction -8..+8 (0 = front, negative = left, +-8 = nothing),
 * 03 most open cm, 04 most open direction -7..+7, 05 front cm (sensors 4 & 5 average),
 * 06 nearest mm, 07 init bitmap (bit0 = sensor 1), 08 fault bitmap, 09 front mm,
 * 10..17 sensor 1..8 cm (sensor 1 = leftmost), 18..1F sensor 1..8 mm.
 * Status F3: b0 ready (all 8 up, ~2-4 s after power-on), b1 any sensor failed.
 */

namespace mbc {
    const TOF8_NEAREST_CM = 0x01
    const TOF8_NEAREST_DIR = 0x02
    const TOF8_OPEN_CM = 0x03
    const TOF8_OPEN_DIR = 0x04
    const TOF8_FRONT_CM = 0x05
    const TOF8_NEAREST_MM = 0x06
    const TOF8_INIT = 0x07
    const TOF8_FAULT = 0x08
    const TOF8_FRONT_MM = 0x09
    const TOF8_S1_CM = 0x10
    const TOF8_S1_MM = 0x18

    let tof8Addr = ADDR_TOF

    function tof8Get(id: number): number {
        const v = readValue(tof8Addr, id)
        return v == NONE ? 0 : v
    }

    /**
     * Use an 8-ch distance sensor whose I2C address was changed (default 0x29).
     * @param addr I2C address
     */
    //% blockId=mbc_tof8_use_address block="distance 8-ch use address %addr"
    //% help=github:mbc-sensors/docs/tof8-use-address
    //% addr.shadow="mbc_addr_picker"
    //% group="Distance" weight=40 advanced=true
    export function tof8UseAddress(addr: number): void {
        tof8Addr = addr
    }

    /**
     * Nearest distance of all 8 sensors, in cm (0..120) or mm (0..1200).
     * @param unit cm or mm
     */
    //% blockId=mbc_tof8_nearest block="distance 8-ch nearest (%unit)"
    //% help=github:mbc-sensors/docs/tof8-nearest
    //% group="Distance" weight=80
    export function tof8Nearest(unit: MbcDistUnit): number {
        return tof8Get(unit == MbcDistUnit.Mm ? TOF8_NEAREST_MM : TOF8_NEAREST_CM)
    }

    /**
     * Direction of the nearest object: -8..+8, 0 = straight ahead, negative = left, +-8 = nothing seen.
     */
    //% blockId=mbc_tof8_nearest_dir block="distance 8-ch nearest direction"
    //% help=github:mbc-sensors/docs/tof8-nearest-dir
    //% group="Distance" weight=79
    export function tof8NearestDirection(): number {
        return tof8Get(TOF8_NEAREST_DIR)
    }

    /**
     * Distance in cm of the most open (farthest) direction.
     */
    //% blockId=mbc_tof8_open_cm block="distance 8-ch most open (cm)"
    //% help=github:mbc-sensors/docs/tof8-open-cm
    //% group="Distance" weight=78
    export function tof8OpenCm(): number {
        return tof8Get(TOF8_OPEN_CM)
    }

    /**
     * Direction of the most open (farthest) side: -7..+7, negative = left.
     */
    //% blockId=mbc_tof8_open_dir block="distance 8-ch most open direction"
    //% help=github:mbc-sensors/docs/tof8-open-dir
    //% group="Distance" weight=77
    export function tof8OpenDirection(): number {
        return tof8Get(TOF8_OPEN_DIR)
    }

    /**
     * Distance straight ahead (average of sensors 4 and 5) in cm (0..120) or mm (0..1200).
     * @param unit cm or mm
     */
    //% blockId=mbc_tof8_front block="distance 8-ch front (%unit)"
    //% help=github:mbc-sensors/docs/tof8-front
    //% group="Distance" weight=76
    export function tof8Front(unit: MbcDistUnit): number {
        return tof8Get(unit == MbcDistUnit.Mm ? TOF8_FRONT_MM : TOF8_FRONT_CM)
    }

    /**
     * Distance of one sensor (1 = leftmost .. 8 = rightmost) in cm or mm.
     * @param n sensor number 1..8, eg: 1
     * @param unit cm or mm
     */
    //% blockId=mbc_tof8_sensor block="distance 8-ch sensor %n (%unit)"
    //% help=github:mbc-sensors/docs/tof8-sensor
    //% n.min=1 n.max=8 n.defl=1
    //% group="Distance" weight=75
    export function tof8Sensor(n: number, unit: MbcDistUnit): number {
        n = Math.constrain(n | 0, 1, 8)
        return tof8Get((unit == MbcDistUnit.Mm ? TOF8_S1_MM : TOF8_S1_CM) + n - 1)
    }

    /**
     * True when sensor n is initialised and not faulty.
     * @param n sensor number 1..8, eg: 1
     */
    //% blockId=mbc_tof8_sensor_ok block="distance 8-ch sensor %n is OK"
    //% help=github:mbc-sensors/docs/tof8-sensor-ok
    //% n.min=1 n.max=8 n.defl=1
    //% group="Distance" weight=74 advanced=true
    export function tof8SensorOk(n: number): boolean {
        n = Math.constrain(n | 0, 1, 8)
        const init = (tof8Get(TOF8_INIT) >> (n - 1)) & 1
        const fault = (tof8Get(TOF8_FAULT) >> (n - 1)) & 1
        return init == 1 && fault == 0
    }

    let tof8NearHandler: () => void = null
    let tof8NearCm = 10
    let tof8Watcher = false

    /**
     * Run code when the nearest object comes closer than the given cm (once per approach).
     * @param cm distance in cm, eg: 10
     */
    //% blockId=mbc_tof8_on_near block="on distance 8-ch nearer than %cm cm"
    //% help=github:mbc-sensors/docs/tof8-on-near
    //% cm.min=1 cm.max=120 cm.defl=10
    //% group="Distance" weight=70
    export function onTof8Near(cm: number, handler: () => void): void {
        tof8NearCm = Math.constrain(cm | 0, 1, 120)
        tof8NearHandler = handler
        if (tof8Watcher) return
        tof8Watcher = true
        control.inBackground(() => {
            let near = false
            while (true) {
                const d = tof8Get(TOF8_NEAREST_CM)
                const now = d > 0 && d < tof8NearCm
                if (now && !near && tof8NearHandler) tof8NearHandler()
                near = now
                basic.pause(30)
            }
        })
    }
}
