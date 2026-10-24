/**
 * MBC line follower 8-ch / 16-ch (I2C 0x16), protocol v2 value table:
 * 01 line position, 02 fine position, 03 line width, 04 line segments, 05 line bitmap,
 * 06 last exit direction, 07 threshold, 08 calibration count, 10..1F channel 1..16 reflect.
 * Commands: E0 black line, E1 white line, E2 calibrate black, E3 calibrate white,
 *           E4 [threshold], E7 5-second auto calibration.
 * Status F3: b0 ready, b1 white line mode, b2 calibrating, b3 line lost, b4 fork.
 * Direction rule (2026-10-21): viewed from behind the robot, line on the LEFT = negative; channel 1 = leftmost.
 */

enum MbcLineColor {
    //% block="black"
    Black = 0xE0,
    //% block="white"
    White = 0xE1
}

enum MbcLineCalib {
    //% block="current reading is black"
    Black = 0xE2,
    //% block="current reading is white"
    White = 0xE3,
    //% block="auto (sweep for 5 s)"
    Auto = 0xE7
}

enum MbcLineEvent {
    //% block="lost"
    Lost = 0,
    //% block="found"
    Found = 1,
    //% block="fork"
    Fork = 2
}

namespace mbc {
    const LINE_POS = 0x01
    const LINE_POS_FINE = 0x02
    const LINE_WIDTH = 0x03
    const LINE_SEGMENTS = 0x04
    const LINE_BITMAP = 0x05
    const LINE_LAST_DIR = 0x06
    const LINE_THRESHOLD = 0x07
    const LINE_CALIB_COUNT = 0x08
    const LINE_CH1 = 0x10
    const LINE_CMD_THRESHOLD = 0xE4

    let lineAddr = ADDR_LINE

    function lineGet(id: number): number {
        const v = readValue(lineAddr, id)
        return v == NONE ? 0 : v
    }

    /**
     * Use a line follower whose I2C address was changed (default 0x16).
     * @param addr I2C address
     */
    //% blockId=mbc_line_use_address block="line follower use address %addr"
    //% help=github:mbc-sensors/docs/line-use-address
    //% addr.shadow="mbc_addr_picker"
    //% group="Line" weight=50 advanced=true
    export function lineUseAddress(addr: number): void {
        lineAddr = addr
    }

    /**
     * Line position: which channel the line is under. 0 = centre,
     * negative = line on the left (viewed from behind), -8..+8 (8-ch) or -16..+16 (16-ch).
     */
    //% blockId=mbc_line_position block="line position"
    //% help=github:mbc-sensors/docs/line-position
    //% group="Line" weight=100
    export function linePosition(): number {
        return lineGet(LINE_POS)
    }

    /**
     * Fine line position -100..100, 0 = centre, negative = left (same sign as line position).
     */
    //% blockId=mbc_line_position_fine block="fine line position"
    //% help=github:mbc-sensors/docs/line-position-fine
    //% group="Line" weight=99
    export function linePositionFine(): number {
        return lineGet(LINE_POS_FINE)
    }

    /**
     * True when at least one line segment is under the sensor.
     */
    //% blockId=mbc_line_seen block="line is seen"
    //% help=github:mbc-sensors/docs/line-seen
    //% group="Line" weight=98
    export function lineSeen(): boolean {
        return lineGet(LINE_SEGMENTS) > 0
    }

    /**
     * Number of channels on the line (line width); 0 = no line.
     */
    //% blockId=mbc_line_width block="line width"
    //% help=github:mbc-sensors/docs/line-width
    //% group="Line" weight=97
    export function lineWidth(): number {
        return lineGet(LINE_WIDTH)
    }

    /**
     * Number of separate line segments: 0 = lost, 1 = one line, 2 or more = fork / crossing.
     */
    //% blockId=mbc_line_segments block="line segments"
    //% help=github:mbc-sensors/docs/line-segments
    //% group="Line" weight=96
    export function lineSegments(): number {
        return lineGet(LINE_SEGMENTS)
    }

    /**
     * Line bitmap: bit0 = channel 1 (leftmost) ... bit15 = channel 16; 1 = that channel sees the line.
     */
    //% blockId=mbc_line_bitmap block="line bitmap"
    //% help=github:mbc-sensors/docs/line-bitmap
    //% group="Line" weight=95
    export function lineBitmap(): number {
        return lineGet(LINE_BITMAP) & 0xFFFF
    }

    /**
     * True when channel n (1 = leftmost) is on the line.
     * @param n channel number 1..16, eg: 1
     */
    //% blockId=mbc_line_channel_on_line block="channel %n is on the line"
    //% help=github:mbc-sensors/docs/line-channel-on-line
    //% n.min=1 n.max=16 n.defl=1
    //% group="Line" weight=94
    export function lineChannelOnLine(n: number): boolean {
        n = Math.constrain(n | 0, 1, 16)
        return ((lineBitmap() >> (n - 1)) & 1) == 1
    }

    /**
     * Calibrated reflect value of channel n, 0 = black .. 100 = white.
     * @param n channel number 1..16, 1 = leftmost, eg: 1
     */
    //% blockId=mbc_line_channel block="channel %n reflect"
    //% help=github:mbc-sensors/docs/line-channel
    //% n.min=1 n.max=16 n.defl=1
    //% group="Line" weight=93
    export function lineChannel(n: number): number {
        n = Math.constrain(n | 0, 1, 16)
        return lineGet(LINE_CH1 + n - 1)
    }

    /**
     * Where the line was before it was lost: negative = left; keeps the last value.
     */
    //% blockId=mbc_line_last_dir block="last exit direction"
    //% help=github:mbc-sensors/docs/line-last-dir
    //% group="Line" weight=92
    export function lineLastDirection(): number {
        return lineGet(LINE_LAST_DIR)
    }

    /**
     * Current reflect threshold 1..99 used to decide "on line" (default 50).
     */
    //% blockId=mbc_line_threshold block="line threshold"
    //% help=github:mbc-sensors/docs/line-threshold
    //% group="Line" weight=91
    export function lineThreshold(): number {
        return lineGet(LINE_THRESHOLD)
    }

    /**
     * Number of calibrations completed since power-on.
     */
    //% blockId=mbc_line_calib_count block="line calibration count"
    //% help=github:mbc-sensors/docs/line-calib-count
    //% group="Line" weight=90 advanced=true
    export function lineCalibrationCount(): number {
        return lineGet(LINE_CALIB_COUNT)
    }

    /**
     * True while a calibration (E2 / E3 / E7) is running (status bit2).
     */
    //% blockId=mbc_line_calibrating block="line follower is calibrating"
    //% help=github:mbc-sensors/docs/line-calibrating
    //% group="Line" weight=89 advanced=true
    export function lineCalibrating(): boolean {
        return statusBit(lineAddr, 2)
    }

    /**
     * Follow a black (default) or a white line.
     * @param color line colour
     */
    //% blockId=mbc_line_set_color block="line follower follow %color line"
    //% help=github:mbc-sensors/docs/line-set-color
    //% group="Line" weight=85
    export function lineSetColor(color: MbcLineColor): void {
        writeCmd(lineAddr, color, [])
    }

    /**
     * Calibrate the line follower (saved to EEPROM). Black / white: ~50 ms; auto: sweep over black line and white surface for 5 s.
     * @param mode calibration mode
     */
    //% blockId=mbc_line_calibrate block="line follower calibrate %mode"
    //% help=github:mbc-sensors/docs/line-calibrate
    //% group="Line" weight=84
    export function lineCalibrate(mode: MbcLineCalib): void {
        writeCmd(lineAddr, mode, [])
    }

    /**
     * Set the reflect threshold 1..99 for "on line" (RAM only, back to 50 after reboot).
     * @param threshold 1..99, eg: 50
     */
    //% blockId=mbc_line_set_threshold block="line follower set threshold %threshold"
    //% help=github:mbc-sensors/docs/line-set-threshold
    //% threshold.min=1 threshold.max=99 threshold.defl=50
    //% group="Line" weight=83
    export function lineSetThreshold(threshold: number): void {
        threshold = Math.constrain(threshold | 0, 1, 99)
        writeCmd(lineAddr, LINE_CMD_THRESHOLD, [threshold])
    }

    let lineLostHandler: () => void = null
    let lineFoundHandler: () => void = null
    let lineForkHandler: () => void = null
    let lineWatcher = false

    /**
     * Run code when the line is lost, found again, or a fork / crossing appears.
     * @param event line event
     */
    //% blockId=mbc_line_on_event block="on line %event"
    //% help=github:mbc-sensors/docs/line-on-event
    //% group="Line" weight=80
    export function onLineEvent(event: MbcLineEvent, handler: () => void): void {
        if (event == MbcLineEvent.Lost) lineLostHandler = handler
        else if (event == MbcLineEvent.Found) lineFoundHandler = handler
        else lineForkHandler = handler
        if (lineWatcher) return
        lineWatcher = true
        control.inBackground(() => {
            let last = 1
            while (true) {
                const seg = lineGet(LINE_SEGMENTS)
                if (last > 0 && seg == 0 && lineLostHandler) lineLostHandler()
                if (last == 0 && seg > 0 && lineFoundHandler) lineFoundHandler()
                if (last < 2 && seg >= 2 && lineForkHandler) lineForkHandler()
                last = seg
                basic.pause(20)
            }
        })
    }
}
