/**
 * MBC gamepad receiver PS2 / PS4 (I2C 0x42), protocol v2 value table (both models identical):
 * 01 16 buttons (PSX layout), 02 d-pad, 03 shape buttons, 04 shoulder buttons, 05 function buttons,
 * 06 connected, 07 battery 0..100 (PS4; PS2 = 0), 08 L2 analog 0..255, 09 R2 analog 0..255,
 * 0A system buttons (b0 PS, b1 capture; PS2 = 0), 0B pad type (0 none, 1 PS2 digital, 2 PS2 analog, 3 PS4, 4 PS5),
 * 10..13 LX LY RX RY -100..+100 (0 = centre, right / up = positive).
 * 0C pairing state (PS4 receiver: 0 not bonded, 1 pairing, 2 bonded but gamepad off, 3 connected).
 * Commands (PS4 only, PS2 ignores): E5 [strength] rumble, E6 [R][G][B] light bar, E0 [A5] pair again,
 * E7 [strength][time x10 ms] rumble for a time, E8 [A5 save / 00 back to blue] power-on light colour, E9 [0..50 %] stick dead zone, EA [0..31] PS5 player LEDs.
 * Status F3: b0 ready, b1 gamepad connected, b2 pairing window open, b3 bonded.
 * PS4 receiver is an ESP32 and cannot clock-stretch: mbc.readValues already waits 2 ms.
 */

enum MbcPadButton {
    //% block="select / share"
    Select = 0,
    //% block="L3"
    L3 = 1,
    //% block="R3"
    R3 = 2,
    //% block="start / options"
    Start = 3,
    //% block="up"
    Up = 4,
    //% block="right"
    Right = 5,
    //% block="down"
    Down = 6,
    //% block="left"
    Left = 7,
    //% block="L2"
    L2 = 8,
    //% block="R2"
    R2 = 9,
    //% block="L1"
    L1 = 10,
    //% block="R1"
    R1 = 11,
    //% block="triangle"
    Triangle = 12,
    //% block="circle"
    Circle = 13,
    //% block="cross"
    Cross = 14,
    //% block="square"
    Square = 15
}

enum MbcPadAxis {
    //% block="left X"
    LeftX = 0x10,
    //% block="left Y"
    LeftY = 0x11,
    //% block="right X"
    RightX = 0x12,
    //% block="right Y"
    RightY = 0x13
}

enum MbcPadTrigger {
    //% block="L2"
    L2 = 0x08,
    //% block="R2"
    R2 = 0x09
}

enum MbcPadGroup {
    //% block="d-pad"
    Dpad = 0x02,
    //% block="shapes"
    Shapes = 0x03,
    //% block="shoulders"
    Shoulders = 0x04,
    //% block="functions"
    Functions = 0x05
}

enum MbcPadSystemButton {
    //% block="PS"
    Ps = 0,
    //% block="capture"
    Capture = 1
}

enum MbcPadButtonEvent {
    //% block="pressed"
    Pressed = 0,
    //% block="released"
    Released = 1
}

namespace mbc {
    const PAD_BUTTONS = 0x01
    const PAD_CONNECTED = 0x06
    const PAD_BATTERY = 0x07
    const PAD_SYSTEM = 0x0A
    const PAD_TYPE = 0x0B
    const PAD_CMD_RUMBLE = 0xE5
    const PAD_CMD_LIGHT = 0xE6
    const PAD_PAIR_STATE = 0x0C
    const PAD_CMD_PAIR = 0xE0
    const PAD_CMD_RUMBLE_FOR = 0xE7
    const PAD_CMD_SAVE_LIGHT = 0xE8
    const PAD_CMD_DEAD_ZONE = 0xE9
    const PAD_CMD_PLAYER_LED = 0xEA

    let padAddr = ADDR_PAD

    function padGet(id: number): number {
        const v = readValue(padAddr, id)
        return v == NONE ? 0 : v
    }

    /**
     * Use a gamepad receiver whose I2C address was changed (default 0x42).
     * @param addr I2C address
     */
    //% blockId=mbc_pad_use_address block="gamepad use address %addr"
    //% help=github:mbc-sensors/docs/pad-use-address
    //% addr.shadow="mbc_addr_picker"
    //% group="Gamepad" weight=50 advanced=true
    export function padUseAddress(addr: number): void {
        padAddr = addr
    }

    /**
     * True while the button is held down.
     * @param button gamepad button
     */
    //% blockId=mbc_pad_button_pressed block="gamepad button %button is pressed"
    //% help=github:mbc-sensors/docs/pad-button-pressed
    //% group="Gamepad" weight=100
    export function padButtonPressed(button: MbcPadButton): boolean {
        return ((padGet(PAD_BUTTONS) >> button) & 1) == 1
    }

    /**
     * All 16 buttons as a bit mask (PSX layout: bit0 select, 1 L3, 2 R3, 3 start, 4 up, 5 right, 6 down, 7 left,
     * 8 L2, 9 R2, 10 L1, 11 R1, 12 triangle, 13 circle, 14 cross, 15 square).
     */
    //% blockId=mbc_pad_buttons block="gamepad buttons bit mask"
    //% help=github:mbc-sensors/docs/pad-buttons
    //% group="Gamepad" weight=99 advanced=true
    export function padButtons(): number {
        return padGet(PAD_BUTTONS) & 0xFFFF
    }

    /**
     * One 4-button group as a 0..15 nibble: d-pad (up 1, right 2, down 4, left 8),
     * shapes (triangle 1, circle 2, cross 4, square 8), shoulders (L2 1, R2 2, L1 4, R1 8),
     * functions (select 1, L3 2, R3 4, start 8).
     * @param group button group
     */
    //% blockId=mbc_pad_group block="gamepad %group buttons (0-15)"
    //% help=github:mbc-sensors/docs/pad-group
    //% group="Gamepad" weight=98 advanced=true
    export function padGroup(group: MbcPadGroup): number {
        return padGet(group) & 0x0F
    }

    /**
     * Joystick axis -100..+100, 0 = centre, right / up = positive.
     * @param axis joystick axis
     */
    //% blockId=mbc_pad_stick block="gamepad joystick %axis"
    //% help=github:mbc-sensors/docs/pad-stick
    //% group="Gamepad" weight=97
    export function padStick(axis: MbcPadAxis): number {
        return Math.constrain(padGet(axis), -100, 100)
    }

    /**
     * Analog pressure of L2 / R2, 0..255 (PS2 digital pads report 255 when pressed).
     * @param trigger L2 or R2
     */
    //% blockId=mbc_pad_trigger block="gamepad trigger %trigger analog"
    //% help=github:mbc-sensors/docs/pad-trigger
    //% group="Gamepad" weight=96
    export function padTrigger(trigger: MbcPadTrigger): number {
        return Math.constrain(padGet(trigger), 0, 255)
    }

    /**
     * True when a gamepad is connected to the receiver.
     */
    //% blockId=mbc_pad_connected block="gamepad is connected"
    //% help=github:mbc-sensors/docs/pad-connected
    //% group="Gamepad" weight=95
    export function padConnected(): boolean {
        return padGet(PAD_CONNECTED) != 0
    }

    /**
     * Gamepad battery 0..100 (PS4 / PS5; PS2 always 0).
     */
    //% blockId=mbc_pad_battery block="gamepad battery percent"
    //% help=github:mbc-sensors/docs/pad-battery
    //% group="Gamepad" weight=94
    export function padBattery(): number {
        return Math.constrain(padGet(PAD_BATTERY), 0, 100)
    }

    /**
     * True while the PS or capture button is held down (PS4 / PS5 only).
     * @param button system button
     */
    //% blockId=mbc_pad_system_button block="gamepad system button %button is pressed"
    //% help=github:mbc-sensors/docs/pad-system-button
    //% group="Gamepad" weight=93 advanced=true
    export function padSystemButtonPressed(button: MbcPadSystemButton): boolean {
        return ((padGet(PAD_SYSTEM) >> button) & 1) == 1
    }

    /**
     * Gamepad type: 0 none, 1 PS2 digital, 2 PS2 analog, 3 PS4, 4 PS5.
     */
    //% blockId=mbc_pad_type block="gamepad type"
    //% help=github:mbc-sensors/docs/pad-type
    //% group="Gamepad" weight=92 advanced=true
    export function padType(): number {
        return padGet(PAD_TYPE)
    }

    /**
     * Rumble the PS4 / PS5 gamepad (E5). 0 = stop. PS2 ignores this.
     * @param strength 0..255, eg: 200
     */
    //% blockId=mbc_pad_rumble block="gamepad rumble strength %strength"
    //% help=github:mbc-sensors/docs/pad-rumble
    //% strength.min=0 strength.max=255 strength.defl=200
    //% group="Gamepad" weight=85
    export function padRumble(strength: number): void {
        strength = Math.constrain(strength | 0, 0, 255)
        writeCmd(padAddr, PAD_CMD_RUMBLE, [strength])
    }

    /**
     * Set the PS4 / PS5 light bar colour (E6 [R][G][B]). PS2 ignores this.
     * @param color RGB colour, eg: 0xFF0000
     */
    //% blockId=mbc_pad_light block="gamepad light bar colour %color"
    //% help=github:mbc-sensors/docs/pad-light
    //% color.shadow="colorNumberPicker"
    //% group="Gamepad" weight=84
    export function padLight(color: number): void {
        writeCmd(padAddr, PAD_CMD_LIGHT, [(color >> 16) & 0xFF, (color >> 8) & 0xFF, color & 0xFF])
    }

    /**
     * Rumble the PS4 / PS5 gamepad for a time, then stop by itself (E7). PS2 ignores this.
     * @param strength 0..255, eg: 200
     * @param ms time in ms (10..2550), eg: 500
     */
    //% blockId=mbc_pad_rumble_for block="gamepad rumble strength %strength for %ms ms"
    //% help=github:mbc-sensors/docs/pad-rumble-for
    //% strength.min=0 strength.max=255 strength.defl=200
    //% ms.min=10 ms.max=2550 ms.defl=500
    //% group="Gamepad" weight=83
    export function padRumbleFor(strength: number, ms: number): void {
        strength = Math.constrain(strength | 0, 0, 255)
        const t = Math.constrain(Math.idiv((ms | 0) + 5, 10), 1, 255)
        writeCmd(padAddr, PAD_CMD_RUMBLE_FOR, [strength, t])
    }

    /**
     * Stick dead zone 0..50 % (E9): small stick moves inside it read 0. Back to about 6 % after power-off.
     * @param percent 0..50, eg: 6
     */
    //% blockId=mbc_pad_dead_zone block="gamepad stick dead zone (percent) %percent"
    //% help=github:mbc-sensors/docs/pad-dead-zone
    //% percent.min=0 percent.max=50 percent.defl=6
    //% group="Gamepad" weight=82 advanced=true
    export function padDeadZone(percent: number): void {
        writeCmd(padAddr, PAD_CMD_DEAD_ZONE, [Math.constrain(percent | 0, 0, 50)])
    }

    /**
     * PS5 player LEDs (EA): bit 0..4 = the 5 LEDs, 0..31. Sent again every time the gamepad reconnects. PS4 has no player LEDs.
     * @param bits 0..31, eg: 4
     */
    //% blockId=mbc_pad_player_leds block="gamepad PS5 player LEDs %bits"
    //% help=github:mbc-sensors/docs/pad-player-leds
    //% bits.min=0 bits.max=31 bits.defl=4
    //% group="Gamepad" weight=81 advanced=true
    export function padPlayerLeds(bits: number): void {
        writeCmd(padAddr, PAD_CMD_PLAYER_LED, [Math.constrain(bits | 0, 0, 31)])
    }

    /**
     * Save the current light bar colour as the power-on colour, or go back to the factory blue (E8).
     * @param save true = save current colour, false = back to blue, eg: true
     */
    //% blockId=mbc_pad_save_light block="gamepad save light bar colour for power-on %save"
    //% help=github:mbc-sensors/docs/pad-save-light
    //% save.shadow="toggleYesNo" save.defl=true
    //% group="Gamepad" weight=79 advanced=true
    export function padSaveLight(save: boolean): void {
        writeCmd(padAddr, PAD_CMD_SAVE_LIGHT, [save ? 0xA5 : 0x00])
    }

    /**
     * Forget the bonded gamepad and open a 30 s pairing window (E0 with code A5, same as the Reset button).
     */
    //% blockId=mbc_pad_pair_again block="gamepad pair again"
    //% help=github:mbc-sensors/docs/pad-pair-again
    //% group="Gamepad" weight=78 advanced=true
    export function padPairAgain(): void {
        writeCmd(padAddr, PAD_CMD_PAIR, [0xA5])
    }

    /**
     * PS4 receiver pairing state (0C): 0 not bonded, 1 pairing, 2 bonded but gamepad off, 3 connected.
     */
    //% blockId=mbc_pad_pair_state block="gamepad pairing state"
    //% help=github:mbc-sensors/docs/pad-pair-state
    //% group="Gamepad" weight=77 advanced=true
    export function padPairState(): number {
        return padGet(PAD_PAIR_STATE)
    }

    let padPressHandlers: (() => void)[] = []
    let padReleaseHandlers: (() => void)[] = []
    let padWatcher = false

    /**
     * Run code when a gamepad button is pressed or released.
     * @param button gamepad button
     * @param event pressed or released
     */
    //% blockId=mbc_pad_on_button block="on gamepad button %button %event"
    //% help=github:mbc-sensors/docs/pad-on-button
    //% group="Gamepad" weight=80
    export function onPadButton(button: MbcPadButton, event: MbcPadButtonEvent, handler: () => void): void {
        if (padPressHandlers.length == 0) {
            for (let i = 0; i < 16; i++) { padPressHandlers.push(null); padReleaseHandlers.push(null) }
        }
        if (event == MbcPadButtonEvent.Pressed) padPressHandlers[button] = handler
        else padReleaseHandlers[button] = handler
        if (padWatcher) return
        padWatcher = true
        control.inBackground(() => {
            let last = 0
            while (true) {
                const now = padGet(PAD_BUTTONS) & 0xFFFF
                const changed = now ^ last
                if (changed) {
                    for (let i = 0; i < 16; i++) {
                        if ((changed >> i) & 1) {
                            if ((now >> i) & 1) { if (padPressHandlers[i]) padPressHandlers[i]() }
                            else if (padReleaseHandlers[i]) padReleaseHandlers[i]()
                        }
                    }
                }
                last = now
                basic.pause(20)
            }
        })
    }
}
