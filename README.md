# MBC Pro Sensors for micro:bit

> Open this page at [https://contactmbcrobot.github.io/pxt-mbc-sensors/](https://contactmbcrobot.github.io/pxt-mbc-sensors/)

MakeCode extension for **MBC Pro Sensors** on BBC micro:bit V1 and V2 (MBC I2C protocol v2, 2026-10).
Product site: [https://mbc-pro-sensors.github.io/](https://mbc-pro-sensors.github.io/) (繁體中文／English).

| Product | I2C address | Group | micro:bit page |
|---|---|---|---|
| Line follower 8-ch / 16-ch (循行者) | 0x16 | Line | [line8](https://mbc-pro-sensors.github.io/en/sensors/line8/microbit/makecode.html) · [line16](https://mbc-pro-sensors.github.io/en/sensors/line16/microbit/makecode.html) |
| Distance sensor 2-ch / 8-ch (測距者) | 0x29 | Distance | [tof2](https://mbc-pro-sensors.github.io/en/sensors/tof2/microbit/makecode.html) · [tof8](https://mbc-pro-sensors.github.io/en/sensors/tof8/microbit/makecode.html) |
| Gamepad receiver PS2 / PS4 (掌控者) | 0x42 | Gamepad | [ps2](https://mbc-pro-sensors.github.io/en/sensors/ps2/microbit/makecode.html) · [ps4](https://mbc-pro-sensors.github.io/en/sensors/ps4/microbit/makecode.html) |
| IMU / gyro (陀螺儀) | 0x6A | IMU | [imu](https://mbc-pro-sensors.github.io/en/sensors/imu/microbit/makecode.html) |
| ESP32 camera, school / WRO edition (神攝手) | 0x4C | Camera | [esp32cam](https://mbc-pro-sensors.github.io/en/sensors/esp32cam/microbit/makecode.html) |

Wiring: MBC 4-pin cable to the micro:bit edge connector, **P19 = SCL, P20 = SDA**, 3V and GND.
Several products can share the bus as long as their addresses differ (change an address with the *Device* blocks).
Products that draw more than the micro:bit 3V pin can supply (distance 8-ch, ESP32 products) need their own power.

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/contactmbcrobot/pxt-mbc-sensors** and import

Traditional Chinese block names are included (`_locales/zh-TW`): switch the editor language to 繁體中文.

## Blocks

### Line follower

```blocks
// Sweep the sensor over black and white for 5 s to calibrate (saved on the sensor)
mbc.lineCalibrate(MbcLineCalib.Auto)
basic.forever(function () {
    // 0 = line in the centre, negative = line on the left (seen from behind the robot)
    basic.showNumber(mbc.linePosition())
    // channel 1 is the leftmost channel
    if (mbc.lineChannelOnLine(1)) {
        basic.showArrow(ArrowNames.West)
    }
})
// Runs once when the robot loses the line
mbc.onLineEvent(MbcLineEvent.Lost, function () {
    basic.showIcon(IconNames.No)
})
```

### Distance sensor

```blocks
// Long-range mode: "no target" becomes 200 cm instead of 120 cm (sensor firmware 2026-10-29 or later)
mbc.tof8SetMode(MbcTofMode.LongRange)
basic.forever(function () {
    // 2-way sensor: distance of the left laser in cm
    basic.showNumber(mbc.tof2Distance(MbcTofSide.Left, MbcDistUnit.Cm))
    // 8-way sensor: nearest target in mm and its direction (-8 left ... 0 front ... +8 right)
    basic.showNumber(mbc.tof8Nearest(MbcDistUnit.Mm))
    basic.showNumber(mbc.tof8NearestDirection())
})
// Runs when anything comes closer than 10 cm to the 8-way sensor
mbc.onTof8Near(10, function () {
    basic.showIcon(IconNames.Skull)
})
```

### Gamepad

```blocks
// When ✕ is pressed: rumble and turn the light bar red (PS4 / PS5 gamepads)
mbc.onPadButton(MbcPadButton.Cross, MbcPadButtonEvent.Pressed, function () {
    mbc.padRumble(200)
    mbc.padLight(0xff0000)
})
basic.forever(function () {
    // Only read the stick while a gamepad is paired; left stick up/down is -100 ... 100
    if (mbc.padConnected()) {
        basic.showNumber(mbc.padStick(MbcPadAxis.LeftY))
    }
})
```

### IMU

```blocks
// Make the current direction 0°
mbc.imuZeroHeading()
basic.forever(function () {
    // Heading in degrees, and nose up / down angle
    basic.showNumber(mbc.imuHeading(MbcImuHeading.Fused))
    basic.showNumber(mbc.imuPitch())
})
// Runs after the robot has turned 90°
mbc.onImuTurned(90, function () {
    basic.showIcon(IconNames.Yes)
})
```

### Camera

```blocks
basic.forever(function () {
    // School edition: X position of the tracked colour blob
    if (mbc.camFound()) {
        basic.showNumber(mbc.camBlob(MbcCamBlob.X))
    }
    // WRO edition: colour code of spot 1
    basic.showNumber(mbc.camSpotColor(1))
})
```

### Device (advanced)

```blocks
// Wait up to 5 s for the line follower, then show its firmware version and kind
if (mbc.waitReady(mbc.ADDR_LINE, 5000)) {
    basic.showString(mbc.firmwareVersion(mbc.ADDR_LINE))
    basic.showNumber(mbc.deviceKind(mbc.ADDR_LINE))
}
```

### When a sensor is not connected

If a sensor does not answer (unplugged, no power, wrong address), the blocks do not stop the program and print nothing:

* every **reading** block returns `0` (the firmware version returns an empty text);
* every **yes / no** block returns **false**, e.g. *camera spot 1 is colour*, *IMU face up is +X*, *gamepad is connected*.

`0` can also be a real reading (line in the centre, hue red, object touching the sensor), so check the connection first with **device at … is ready** (Device, advanced): it is false when nothing answers.

```blocks
basic.forever(function () {
    if (mbc.deviceReady(mbc.ADDR_LINE)) {
        basic.showNumber(mbc.linePosition())
    } else {
        // nothing answers at 0x16: check the cable and power
        basic.showIcon(IconNames.No)
    }
})
```

## Learn more

* micro:bit guide (wiring, power, block list): [https://mbc-pro-sensors.github.io/en/microbit.html](https://mbc-pro-sensors.github.io/en/microbit.html)
* Five step-by-step examples per product:
  [line follower 8-ch](https://mbc-pro-sensors.github.io/en/sensors/line8/microbit-examples.html) ·
  [line follower 16-ch](https://mbc-pro-sensors.github.io/en/sensors/line16/microbit-examples.html) ·
  [distance 2-ch](https://mbc-pro-sensors.github.io/en/sensors/tof2/microbit-examples.html) ·
  [distance 8-ch](https://mbc-pro-sensors.github.io/en/sensors/tof8/microbit-examples.html) ·
  [gamepad PS2](https://mbc-pro-sensors.github.io/en/sensors/ps2/microbit-examples.html) ·
  [gamepad PS4](https://mbc-pro-sensors.github.io/en/sensors/ps4/microbit-examples.html) ·
  [IMU](https://mbc-pro-sensors.github.io/en/sensors/imu/microbit-examples.html) ·
  [camera](https://mbc-pro-sensors.github.io/en/sensors/esp32cam/microbit-examples.html)
* Every value and command, with figures: [reference](https://mbc-pro-sensors.github.io/en/reference.html)

## Protocol v2 in short

* Read: write `[id]`, wait 2 ms, read `2 × k` bytes = `k` consecutive **int16 little-endian** values (`k ≤ 16`). Undefined ids read as `-32768`.
* Common ids: `F0` device id (low byte = factory address, high byte = kind), `F1` protocol version (2), `F2` firmware version (major×100+minor), `F3` status flags (bit0 = ready), `F4` update counter, `F5` uptime seconds.
* Commands: `E0`–`EE` per product, `F8 [new][~new]` change address (`F8 00 FF` = factory), `EF A5` reboot.
* Full value tables: [https://mbc-pro-sensors.github.io/en/i2c-protocol.html](https://mbc-pro-sensors.github.io/en/i2c-protocol.html)

## Block help

Right-click any block → **Help** opens its page in [`docs/`](docs/) (description, parameters, a runnable example and the product guide link).

## Test

`test.ts` calls every block at least once.

* **Compile**: `test.ts` must build for micro:bit V1 and V2 (`makecode build`). Pass = no errors.
* **Simulator**: run `test.ts`; the I2C bus is not simulated, so every reading is 0. Pass = no error icon and no exception.
* **Hardware**: connect a sensor to P19 (SCL) / P20 (SDA), open the serial console and press **A**: each connected sensor prints its address, id, protocol version (2) and firmware version. Pass = the line shows up for the sensor you connected and its values change when you move the robot or press the gamepad buttons.

Status: all blocks compile and run in the simulator on V1 and V2; checking each block against real sensors on V1 and V2 is in progress.

## License

MIT — Shaobo Creative Robotics Company Limited (MBC Robot)

## Supported targets

* for PXT/microbit

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
