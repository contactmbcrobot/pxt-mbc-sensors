/**
 * MBC distance sensor 2-ch (I2C 0x29), protocol v2 value table:
 * 01 left cm, 02 right cm, 03 nearer cm, 04 left mm, 05 right mm,
 * 06 init bitmap (bit0 left, bit1 right), 07 fault bitmap, 08 average mm; settings read back (not in FD): 09 mode, 0A filter, 0B update ms, 0C max cm.
 * No target = the current max distance (120 cm by default, up to 200 cm in long-range mode). Status F3: b0 ready (both sensors up), b1 any sensor failed, b2 busy.
 * Commands: E0 range mode, E1 filter, E2 update time, E3 factory reset [A5], E4 max distance.
 */

enum MbcTofSide {
    //% block="left"
    Left = 0,
    //% block="right"
    Right = 1
}

enum MbcDistUnit {
    //% block="cm"
    Cm = 0,
    //% block="mm"
    Mm = 1
}

enum MbcTofMode {
    //% block="normal (120 cm)"
    Normal = 0,
    //% block="long range (200 cm)"
    LongRange = 1,
    //% block="accurate (100 ms)"
    Accurate = 2,
    //% block="fast (20 ms)"
    Fast = 3
}

enum MbcTofFilter {
    //% block="off"
    Off = 0,
    //% block="median of 3"
    Median3 = 1,
    //% block="median of 5"
    Median5 = 2
}

enum MbcTofSetting {
    //% block="range mode"
    Mode = 0,
    //% block="filter"
    Filter = 1,
    //% block="update time (ms)"
    UpdateMs = 2,
    //% block="max distance (cm)"
    MaxCm = 3
}

namespace mbc {
    const TOF2_LEFT_CM = 0x01
    const TOF2_NEARER_CM = 0x03
    const TOF2_LEFT_MM = 0x04
    const TOF2_INIT = 0x06
    const TOF2_FAULT = 0x07
    const TOF2_AVG_MM = 0x08
    const TOF2_SETTINGS = 0x09   // 09 mode, 0A filter, 0B update ms, 0C max cm
    const TOF_CMD_MODE = 0xE0
    const TOF_CMD_FILTER = 0xE1
    const TOF_CMD_UPDATE = 0xE2
    const TOF_CMD_RESET = 0xE3
    const TOF_CMD_MAX = 0xE4

    let tof2Addr = ADDR_TOF

    function tof2Get(id: number): number {
        const v = readValue(tof2Addr, id)
        return v == NONE ? 0 : v
    }

    /**
     * Use a 2-ch distance sensor whose I2C address was changed (default 0x29).
     * @param addr I2C address
     */
    //% blockId=mbc_tof2_use_address block="distance 2-ch use address %addr"
    //% help=github:mbc-sensors/docs/tof2-use-address
    //% addr.shadow="mbc_addr_picker"
    //% group="Distance" weight=50 advanced=true
    export function tof2UseAddress(addr: number): void {
        tof2Addr = addr
    }

    /**
     * Distance of the left or right sensor in cm or mm; no target = the max distance (120 cm by default, 200 cm in long-range mode).
     * @param side which sensor
     * @param unit cm or mm
     */
    //% blockId=mbc_tof2_distance block="distance 2-ch %side (%unit)"
    //% help=github:mbc-sensors/docs/tof2-distance
    //% group="Distance" weight=100
    export function tof2Distance(side: MbcTofSide, unit: MbcDistUnit): number {
        const base = unit == MbcDistUnit.Mm ? TOF2_LEFT_MM : TOF2_LEFT_CM
        return tof2Get(base + (side == MbcTofSide.Right ? 1 : 0))
    }

    /**
     * The nearer of the two distances in cm.
     */
    //% blockId=mbc_tof2_nearest_cm block="distance 2-ch nearest (cm)"
    //% help=github:mbc-sensors/docs/tof2-nearest-cm
    //% group="Distance" weight=99
    export function tof2NearestCm(): number {
        return tof2Get(TOF2_NEARER_CM)
    }

    /**
     * Average of left and right in mm (same as EV3 mode 3 / SPIKE mode 6).
     */
    //% blockId=mbc_tof2_average_mm block="distance 2-ch average (mm)"
    //% help=github:mbc-sensors/docs/tof2-average-mm
    //% group="Distance" weight=98
    export function tof2AverageMm(): number {
        return tof2Get(TOF2_AVG_MM)
    }

    /**
     * True when the left or right sensor is initialised and not faulty.
     * @param side which sensor
     */
    //% blockId=mbc_tof2_sensor_ok block="distance 2-ch %side sensor is OK"
    //% help=github:mbc-sensors/docs/tof2-sensor-ok
    //% group="Distance" weight=97 advanced=true
    export function tof2SensorOk(side: MbcTofSide): boolean {
        const bit = side == MbcTofSide.Right ? 1 : 0
        const init = (tof2Get(TOF2_INIT) >> bit) & 1
        const fault = (tof2Get(TOF2_FAULT) >> bit) & 1
        return init == 1 && fault == 0
    }

    let tof2NearHandler: () => void = null
    let tof2NearCm = 10
    let tof2Watcher = false

    /**
     * Run code when the nearest distance drops below the given cm (once per approach).
     * @param cm distance in cm, eg: 10
     */
    //% blockId=mbc_tof2_on_near block="on distance 2-ch nearer than %cm cm"
    //% help=github:mbc-sensors/docs/tof2-on-near
    //% cm.min=1 cm.max=200 cm.defl=10
    //% group="Distance" weight=90
    export function onTof2Near(cm: number, handler: () => void): void {
        tof2NearCm = Math.constrain(cm | 0, 1, 200)
        tof2NearHandler = handler
        if (tof2Watcher) return
        tof2Watcher = true
        control.inBackground(() => {
            let near = false
            while (true) {
                const d = tof2Get(TOF2_NEARER_CM)
                const now = d > 0 && d < tof2NearCm
                if (now && !near && tof2NearHandler) tof2NearHandler()
                near = now
                basic.pause(30)
            }
        })
    }

    /**
     * Set the range mode (E0). Also resets update time and max distance to the mode defaults, so send it first. RAM only.
     * @param mode range mode
     */
    //% blockId=mbc_tof2_set_mode block="distance 2-ch range mode %mode"
    //% help=github:mbc-sensors/docs/tof2-set-mode
    //% group="Distance" weight=89
    export function tof2SetMode(mode: MbcTofMode): void {
        writeCmd(tof2Addr, TOF_CMD_MODE, [mode])
    }

    /**
     * Set the distance filter (E1): off, median of the last 3 (default) or 5 readings. RAM only.
     * @param filter filter
     */
    //% blockId=mbc_tof2_set_filter block="distance 2-ch filter %filter"
    //% help=github:mbc-sensors/docs/tof2-set-filter
    //% group="Distance" weight=88 advanced=true
    export function tof2SetFilter(filter: MbcTofFilter): void {
        writeCmd(tof2Addr, TOF_CMD_FILTER, [filter])
    }

    /**
     * Set the time per measurement 20..200 ms (E2); 0 = default of the current mode. RAM only.
     * @param ms 0 or 20..200, eg: 33
     */
    //% blockId=mbc_tof2_set_update_time block="distance 2-ch update time %ms ms"
    //% help=github:mbc-sensors/docs/tof2-set-update-time
    //% ms.min=0 ms.max=200 ms.defl=33
    //% group="Distance" weight=87 advanced=true
    export function tof2SetUpdateTime(ms: number): void {
        writeCmd(tof2Addr, TOF_CMD_UPDATE, [Math.constrain(ms | 0, 0, 200)])
    }

    /**
     * Set the max distance in cm (E4); farther counts as "no target". 0 = max of the current mode. RAM only.
     * @param cm 0 or 10..200, eg: 120
     */
    //% blockId=mbc_tof2_set_max_distance block="distance 2-ch max distance %cm cm"
    //% help=github:mbc-sensors/docs/tof2-set-max-distance
    //% cm.min=0 cm.max=200 cm.defl=120
    //% group="Distance" weight=86 advanced=true
    export function tof2SetMaxDistance(cm: number): void {
        writeCmd(tof2Addr, TOF_CMD_MAX, [Math.constrain(cm | 0, 0, 200)])
    }

    /**
     * Read back a setting: range mode, filter, update time (ms) or max distance (cm).
     * @param setting which setting
     */
    //% blockId=mbc_tof2_setting block="distance 2-ch %setting"
    //% help=github:mbc-sensors/docs/tof2-setting
    //% group="Distance" weight=85 advanced=true
    export function tof2Setting(setting: MbcTofSetting): number {
        return tof2Get(TOF2_SETTINGS + setting)
    }

    /**
     * Back to factory settings (E3 with code A5): normal mode, median of 3, defaults.
     */
    //% blockId=mbc_tof2_factory_reset block="distance 2-ch factory reset"
    //% help=github:mbc-sensors/docs/tof2-factory-reset
    //% group="Distance" weight=84 advanced=true
    export function tof2FactoryReset(): void {
        writeCmd(tof2Addr, TOF_CMD_RESET, [0xA5])
    }
}
