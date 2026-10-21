/**
 * MBC ESP32 camera (I2C 0x4C, SDA = IO3, SCL = IO1; decided 2026-10-21, hardware confirmed, bench test pending).
 * School edition (device kind 1) value table:
 *   01 hue 0..100 (-1 = black / white / grey), 02 saturation 0..100, 03 brightness 0..100, 04 motion 0..100,
 *   05 blob X 0..100, 06 blob Y 0..75, 07 blob width 0..100 (0 = not found), 08 blob height 0..75,
 *   09 blob area (W x H), 0A blob found.
 * WRO edition (device kind 2) value table:
 *   10..1B spot S1..S12 colour code (0..239 colour hue, 240..245 white, 246..250 black, 255 = spot off),
 *   20..2B spot S1..S12 vividness.
 * Status F3: b0 ready, b1 blob found (school edition only).
 * The camera is an ESP32 and cannot clock-stretch: mbc.readValues already waits 2 ms.
 */

enum MbcCamColor {
    //% block="hue"
    Hue = 0x01,
    //% block="saturation"
    Saturation = 0x02,
    //% block="brightness"
    Brightness = 0x03
}

enum MbcCamBlob {
    //% block="X"
    X = 0x05,
    //% block="Y"
    Y = 0x06,
    //% block="width"
    Width = 0x07,
    //% block="height"
    Height = 0x08,
    //% block="area"
    Area = 0x09
}

enum MbcCamSpotKind {
    //% block="colour"
    Colour = 0,
    //% block="white"
    White = 1,
    //% block="black"
    Black = 2,
    //% block="off"
    Off = 3
}

enum MbcCamEvent {
    //% block="found"
    Found = 0,
    //% block="lost"
    Lost = 1
}

namespace mbc {
    const CAM_MOTION = 0x04
    const CAM_FOUND = 0x0A
    const CAM_SPOT_COLOR1 = 0x10
    const CAM_SPOT_VIVID1 = 0x20

    let camAddr = ADDR_CAM

    function camGet(id: number): number {
        const v = readValue(camAddr, id)
        return v == NONE ? 0 : v
    }

    /**
     * Use a camera whose I2C address was changed (default 0x4C).
     * @param addr I2C address
     */
    //% blockId=mbc_cam_use_address block="camera use address %addr"
    //% addr.shadow="mbc_addr_picker"
    //% group="Camera" weight=50 advanced=true
    export function camUseAddress(addr: number): void {
        camAddr = addr
    }

    /**
     * True when the school-edition camera sees a blob of the target colour.
     */
    //% blockId=mbc_cam_found block="camera blob is found"
    //% group="Camera" weight=100
    export function camFound(): boolean {
        return camGet(CAM_FOUND) != 0
    }

    /**
     * Blob position and size (school edition): X 0..100, Y 0..75, width 0..100, height 0..75, area = width x height.
     * @param what which blob value
     */
    //% blockId=mbc_cam_blob block="camera blob %what"
    //% group="Camera" weight=99
    export function camBlob(what: MbcCamBlob): number {
        return camGet(what)
    }

    /**
     * Colour at the centre (school edition): hue 0..100 (-1 = black / white / grey), saturation 0..100, brightness 0..100.
     * @param what which colour value
     */
    //% blockId=mbc_cam_color block="camera colour %what"
    //% group="Camera" weight=98
    export function camColor(what: MbcCamColor): number {
        return camGet(what)
    }

    /**
     * True when the centre colour has no hue (black, white or grey).
     */
    //% blockId=mbc_cam_is_grey block="camera colour is black / white / grey"
    //% group="Camera" weight=97
    export function camIsGrey(): boolean {
        return camGet(MbcCamColor.Hue) < 0
    }

    /**
     * Motion level 0..100 (school edition).
     */
    //% blockId=mbc_cam_motion block="camera motion"
    //% group="Camera" weight=96
    export function camMotion(): number {
        return camGet(CAM_MOTION)
    }

    /**
     * WRO edition: colour code of spot n (1..12): 0..239 = colour hue, 240..245 = white, 246..250 = black, 255 = spot off.
     * @param n spot number 1..12, eg: 1
     */
    //% blockId=mbc_cam_spot_color block="camera spot %n colour code"
    //% n.min=1 n.max=12 n.defl=1
    //% group="Camera" weight=90
    export function camSpotColor(n: number): number {
        n = Math.constrain(n | 0, 1, 12)
        return camGet(CAM_SPOT_COLOR1 + n - 1)
    }

    /**
     * WRO edition: vividness (saturation) of spot n (1..12).
     * @param n spot number 1..12, eg: 1
     */
    //% blockId=mbc_cam_spot_vivid block="camera spot %n vividness"
    //% n.min=1 n.max=12 n.defl=1
    //% group="Camera" weight=89
    export function camSpotVivid(n: number): number {
        n = Math.constrain(n | 0, 1, 12)
        return camGet(CAM_SPOT_VIVID1 + n - 1)
    }

    /**
     * WRO edition: true when spot n is a colour (0..239), white (240..245), black (246..250) or off (255).
     * @param n spot number 1..12, eg: 1
     * @param kind colour / white / black / off
     */
    //% blockId=mbc_cam_spot_is block="camera spot %n is %kind"
    //% n.min=1 n.max=12 n.defl=1
    //% group="Camera" weight=88
    export function camSpotIs(n: number, kind: MbcCamSpotKind): boolean {
        const c = camSpotColor(n)
        if (kind == MbcCamSpotKind.Colour) return c >= 0 && c <= 239
        if (kind == MbcCamSpotKind.White) return c >= 240 && c <= 245
        if (kind == MbcCamSpotKind.Black) return c >= 246 && c <= 250
        return c == 255
    }

    let camFoundHandler: () => void = null
    let camLostHandler: () => void = null
    let camWatcher = false

    /**
     * Run code when the school-edition camera finds or loses the blob.
     * @param event found or lost
     */
    //% blockId=mbc_cam_on_blob block="on camera blob %event"
    //% group="Camera" weight=80
    export function onCamBlob(event: MbcCamEvent, handler: () => void): void {
        if (event == MbcCamEvent.Found) camFoundHandler = handler
        else camLostHandler = handler
        if (camWatcher) return
        camWatcher = true
        control.inBackground(() => {
            let last = false
            while (true) {
                const now = camGet(CAM_FOUND) != 0
                if (now && !last && camFoundHandler) camFoundHandler()
                if (!now && last && camLostHandler) camLostHandler()
                last = now
                basic.pause(30)
            }
        })
    }
}
