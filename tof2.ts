/**
 * MBC distance sensor 2-ch (I2C 0x29), protocol v2 value table:
 * 01 left cm, 02 right cm, 03 nearer cm, 04 left mm, 05 right mm,
 * 06 init bitmap (bit0 left, bit1 right), 07 fault bitmap, 08 average mm.
 * cm 0..120 (120 = no target), mm 0..1200. Status F3: b0 ready (both sensors up), b1 any sensor failed.
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

namespace mbc {
    const TOF2_LEFT_CM = 0x01
    const TOF2_NEARER_CM = 0x03
    const TOF2_LEFT_MM = 0x04
    const TOF2_INIT = 0x06
    const TOF2_FAULT = 0x07
    const TOF2_AVG_MM = 0x08

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
    //% addr.shadow="mbc_addr_picker"
    //% group="Distance" weight=50 advanced=true
    export function tof2UseAddress(addr: number): void {
        tof2Addr = addr
    }

    /**
     * Distance of the left or right sensor in cm (0..120, 120 = nothing) or mm (0..1200).
     * @param side which sensor
     * @param unit cm or mm
     */
    //% blockId=mbc_tof2_distance block="distance 2-ch %side (%unit)"
    //% group="Distance" weight=100
    export function tof2Distance(side: MbcTofSide, unit: MbcDistUnit): number {
        const base = unit == MbcDistUnit.Mm ? TOF2_LEFT_MM : TOF2_LEFT_CM
        return tof2Get(base + (side == MbcTofSide.Right ? 1 : 0))
    }

    /**
     * The nearer of the two distances in cm.
     */
    //% blockId=mbc_tof2_nearest_cm block="distance 2-ch nearest (cm)"
    //% group="Distance" weight=99
    export function tof2NearestCm(): number {
        return tof2Get(TOF2_NEARER_CM)
    }

    /**
     * Average of left and right in mm (same as EV3 mode 3 / SPIKE mode 6).
     */
    //% blockId=mbc_tof2_average_mm block="distance 2-ch average (mm)"
    //% group="Distance" weight=98
    export function tof2AverageMm(): number {
        return tof2Get(TOF2_AVG_MM)
    }

    /**
     * True when the left or right sensor is initialised and not faulty.
     * @param side which sensor
     */
    //% blockId=mbc_tof2_sensor_ok block="distance 2-ch %side sensor is OK"
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
    //% cm.min=1 cm.max=120 cm.defl=10
    //% group="Distance" weight=90
    export function onTof2Near(cm: number, handler: () => void): void {
        tof2NearCm = Math.constrain(cm | 0, 1, 120)
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
}
