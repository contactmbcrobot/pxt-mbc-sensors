// Test program for the mbc-sensors extension. Every block is called at least once.
//
// 1. Build test (no micro:bit needed)
//    Build this extension for V1 and V2 (MakeCode CI, or `makecode build` with mkc.json).
//    Pass = it compiles with no errors.
//
// 2. Self-test (runs at start, in the simulator and on a real micro:bit, no sensor needed)
//    Checks the shared I2C helpers (value range checks, buffer sizes).
//    Pass = the serial console shows "SELFTEST PASS" and the LEDs show a tick.
//    Fail = the console shows "FAIL <name>" for each failed check, then "SELFTEST FAIL", and the LEDs show a cross.
//    After the self-test the program keeps reading every sensor value in a loop:
//    the simulator has no MBC sensor, so the values read 0; the simulator must not show any error.
//
// 3. Hardware test (real micro:bit V1 or V2 with MBC sensors)
//    Connect the sensors to P19 (SCL) / P20 (SDA) with the MBC 4-pin I2C cable and open the serial console.
//    - Device: press A. Each connected sensor prints one line "addr <a> id ... proto 2 fw ...".
//      Pass = one line per connected sensor with "proto 2"; a missing sensor prints nothing.
//      The LEDs show a tick when the line follower is ready, a cross when it is not connected.
//    - Line follower: "pos" is negative when the line is on the left (viewed from behind the robot),
//      positive on the right. Press B to auto-calibrate for 5 s: pass = "calib" counts up.
//      Lift the robot: cross icon (line lost); put it back on the line: tick icon (line found).
//    - Distance 2-ch / 8-ch: move a hand towards the sensor. Pass = "t2L" / "t8near" go down,
//      "tof2 near" / "tof8 near <direction>" printed under 10 cm.
//    - Gamepad: hold cross. Pass = "btnX" is 1, the gamepad rumbles and the light turns red;
//      release cross: rumble stops and the light turns blue.
//    - IMU: turn the robot by 90 degrees. Pass = "turned 90" printed and "head" changes by about 90.
//    - Camera: show a coloured object that the camera was taught. Pass = "blob found" and "blobX" changes;
//      remove it: "blob lost".
//    - Settings commands: shake the micro:bit. Every settings command is sent once.
//      Pass = "rev" is 1, "t2mode" is 1 (long range), "imuDone" is 1.
//      The commands are then undone: line follower not mirrored, distance sensors factory reset.
//      Note: this also resets the IMU calibration and opens the gamepad pairing window (30 s).
//    - Address change: press A+B only on purpose. The line follower is moved to 0x17, set back to the
//      factory address and rebooted. Pass = after 2 s, pressing A still shows "addr 22" (0x16).

// ---- Self-test ----
namespace mbcTest {
    export let failures = 0
    export function check(name: string, ok: boolean) {
        if (!ok) {
            failures++
            serial.writeLine("FAIL " + name)
        }
    }
}
mbcTest.check("isValid(NONE) is false", !mbc.isValid(mbc.NONE))
mbcTest.check("isValid(0) is true", mbc.isValid(0))
mbcTest.check("NONE is -32768", mbc.NONE == -32768)
mbcTest.check("readValues 1 value = 2 bytes", mbc.readValues(mbc.ADDR_LINE, 0x01, 1).length == 2)
mbcTest.check("readValues 8 values = 16 bytes", mbc.readValues(mbc.ADDR_LINE, 0x01, 8).length == 16)
mbcTest.check("readValues clamps 99 to 16 values", mbc.readValues(mbc.ADDR_LINE, 0x01, 99).length == 32)
mbcTest.check("readValues clamps 0 to 1 value", mbc.readValues(mbc.ADDR_LINE, 0x01, 0).length == 2)
if (mbcTest.failures == 0) {
    serial.writeLine("SELFTEST PASS")
    basic.showIcon(IconNames.Yes)
} else {
    serial.writeLine("SELFTEST FAIL " + mbcTest.failures)
    basic.showIcon(IconNames.No)
}

// ---- Device (common) ----
input.onButtonPressed(Button.A, function () {
    const addrs = [mbc.ADDR_LINE, mbc.ADDR_TOF, mbc.ADDR_PAD, mbc.ADDR_IMU, mbc.ADDR_CAM]
    for (let i = 0; i < addrs.length; i++) {
        const a = addrs[i]
        if (!mbc.deviceReady(a)) continue
        serial.writeLine("addr " + a + " id " + mbc.deviceId(a) + " kind " + mbc.deviceKind(a)
            + " proto " + mbc.protocolVersion(a) + " fw " + mbc.firmwareVersion(a)
            + " status " + mbc.status(a) + " bit1 " + mbc.statusBit(a, 1)
            + " seq " + mbc.updateCounter(a) + " up " + mbc.uptime(a))
    }
    basic.showIcon(mbc.waitReady(mbc.ADDR_LINE, 1000) ? IconNames.Yes : IconNames.No)
})
input.onButtonPressed(Button.AB, function () {
    // address management: only run on purpose (takes effect after reboot)
    mbc.changeAddress(mbc.ADDR_LINE, 0x17)
    mbc.resetAddress(0x17)
    mbc.reboot(0x17)
})
const raw = mbc.readValues(mbc.ADDR_LINE, 0x01, 8)
serial.writeLine("raw " + raw.toHex() + " valid " + mbc.isValid(mbc.readValue(mbc.ADDR_LINE, 0x01)))

// ---- Line follower ----
mbc.lineUseAddress(mbc.ADDR_LINE)
mbc.lineSetColor(MbcLineColor.Black)
mbc.lineSetThreshold(50)
input.onButtonPressed(Button.B, function () {
    mbc.lineCalibrate(MbcLineCalib.Auto)
    while (mbc.lineCalibrating()) basic.pause(100)
    serial.writeValue("calib", mbc.lineCalibrationCount())
})
mbc.onLineEvent(MbcLineEvent.Lost, function () {
    basic.showIcon(IconNames.No)
    serial.writeValue("lastDir", mbc.lineLastDirection())
})
mbc.onLineEvent(MbcLineEvent.Found, function () {
    basic.showIcon(IconNames.Yes)
})
mbc.onLineEvent(MbcLineEvent.Fork, function () {
    basic.showIcon(IconNames.Diamond)
})

// ---- Distance 2-ch / 8-ch ----
mbc.tof2UseAddress(mbc.ADDR_TOF)
mbc.tof8UseAddress(mbc.ADDR_TOF)
mbc.onTof2Near(10, function () {
    serial.writeLine("tof2 near")
})
mbc.onTof8Near(10, function () {
    serial.writeLine("tof8 near " + mbc.tof8NearestDirection())
})
mbc.onTof2Near(150, function () {
    serial.writeLine("near 150")
})

// ---- Gamepad ----
mbc.padUseAddress(mbc.ADDR_PAD)
mbc.onPadButton(MbcPadButton.Cross, MbcPadButtonEvent.Pressed, function () {
    mbc.padRumble(200)
    mbc.padLight(0xFF0000)
})
mbc.onPadButton(MbcPadButton.Cross, MbcPadButtonEvent.Released, function () {
    mbc.padRumble(0)
    mbc.padLight(0x0000FF)
})

// ---- IMU ----
mbc.imuUseAddress(mbc.ADDR_IMU)
mbc.imuZeroHeading()
mbc.imuCalibrate(MbcImuCalib.AccelStart)
mbc.imuCalibrate(MbcImuCalib.AccelEnd)
mbc.onImuTurned(90, function () {
    serial.writeLine("turned 90")
})

// ---- Camera ----
mbc.camUseAddress(mbc.ADDR_CAM)
mbc.onCamBlob(MbcCamEvent.Found, function () {
    serial.writeLine("blob found")
})
mbc.onCamBlob(MbcCamEvent.Lost, function () {
    serial.writeLine("blob lost")
})

// ---- Settings commands (shake) ----
input.onGesture(Gesture.Shake, function () {
    mbc.lineSetReversed(true)
    serial.writeValue("rev", mbc.lineReversed() ? 1 : 0)
    mbc.lineSetReversed(false)
    mbc.tof2SetMode(MbcTofMode.LongRange)
    mbc.tof2SetFilter(MbcTofFilter.Median5)
    mbc.tof2SetUpdateTime(50)
    mbc.tof2SetMaxDistance(200)
    serial.writeValue("t2mode", mbc.tof2Setting(MbcTofSetting.Mode))
    mbc.tof2FactoryReset()
    mbc.tof8SetMode(MbcTofMode.Fast)
    mbc.tof8SetFilter(MbcTofFilter.Off)
    mbc.tof8SetUpdateTime(0)
    mbc.tof8SetMaxDistance(0)
    serial.writeValue("t8max", mbc.tof8Setting(MbcTofSetting.MaxCm))
    mbc.tof8FactoryReset()
    mbc.padRumbleFor(200, 500)
    mbc.padDeadZone(6)
    mbc.padPlayerLeds(4)
    mbc.padSaveLight(true)
    mbc.padPairAgain()
    serial.writeValue("pair", mbc.padPairState())
    mbc.imuSetHeading(-90)
    mbc.imuZeroNorth()
    mbc.imuCalibrate(MbcImuCalib.Cancel)
    mbc.imuMaintenance(MbcImuMaint.CalibFactoryReset)
    mbc.imuHeadingCorrection(3600)
    serial.writeValue("imuDone", mbc.imuWaitCommand(5000) ? 1 : 0)
    serial.writeValue("imuRej", mbc.imuCommandIs(MbcImuCmdState.Rejected) ? 1 : 0)
})

// ---- Read every value ----
basic.forever(function () {
    // line
    serial.writeValue("pos", mbc.linePosition())
    serial.writeValue("fine", mbc.linePositionFine())
    serial.writeValue("width", mbc.lineWidth())
    serial.writeValue("seg", mbc.lineSegments())
    serial.writeValue("bitmap", mbc.lineBitmap())
    serial.writeValue("ch1", mbc.lineChannel(1))
    serial.writeValue("ch1on", mbc.lineChannelOnLine(1) ? 1 : 0)
    serial.writeValue("thr", mbc.lineThreshold())
    if (mbc.lineSeen()) led.plot(2, 2)
    // distance
    serial.writeValue("t2L", mbc.tof2Distance(MbcTofSide.Left, MbcDistUnit.Cm))
    serial.writeValue("t2Rmm", mbc.tof2Distance(MbcTofSide.Right, MbcDistUnit.Mm))
    serial.writeValue("t2near", mbc.tof2NearestCm())
    serial.writeValue("t2avg", mbc.tof2AverageMm())
    serial.writeValue("t2ok", mbc.tof2SensorOk(MbcTofSide.Left) ? 1 : 0)
    serial.writeValue("t8near", mbc.tof8Nearest(MbcDistUnit.Cm))
    serial.writeValue("t8nearmm", mbc.tof8Nearest(MbcDistUnit.Mm))
    serial.writeValue("t8dir", mbc.tof8NearestDirection())
    serial.writeValue("t8open", mbc.tof8OpenCm())
    serial.writeValue("t8opendir", mbc.tof8OpenDirection())
    serial.writeValue("t8front", mbc.tof8Front(MbcDistUnit.Cm))
    serial.writeValue("t8frontmm", mbc.tof8Front(MbcDistUnit.Mm))
    serial.writeValue("t8s1", mbc.tof8Sensor(1, MbcDistUnit.Cm))
    serial.writeValue("t8s1ok", mbc.tof8SensorOk(1) ? 1 : 0)
    // gamepad
    serial.writeValue("btnX", mbc.padButtonPressed(MbcPadButton.Cross) ? 1 : 0)
    serial.writeValue("btns", mbc.padButtons())
    serial.writeValue("dpad", mbc.padGroup(MbcPadGroup.Dpad))
    serial.writeValue("lx", mbc.padStick(MbcPadAxis.LeftX))
    serial.writeValue("l2", mbc.padTrigger(MbcPadTrigger.L2))
    serial.writeValue("conn", mbc.padConnected() ? 1 : 0)
    serial.writeValue("bat", mbc.padBattery())
    serial.writeValue("ps", mbc.padSystemButtonPressed(MbcPadSystemButton.Ps) ? 1 : 0)
    serial.writeValue("padType", mbc.padType())
    // imu
    serial.writeValue("head", mbc.imuHeading(MbcImuHeading.Fused))
    serial.writeValue("yawRate", mbc.imuYawRate())
    serial.writeValue("pitch", mbc.imuPitch())
    serial.writeValue("pitchRate", mbc.imuPitchRate())
    serial.writeValue("gx", mbc.imuAxis(MbcImuSensor.Gyro, MbcAxis.X))
    serial.writeValue("face", mbc.imuFaceUp())
    serial.writeValue("faceZ", mbc.imuFaceUpIs(MbcImuFace.PlusZ) ? 1 : 0)
    serial.writeValue("magTrust", mbc.imuMagTrust())
    serial.writeValue("magDist", mbc.imuMagDisturbance())
    serial.writeValue("still", mbc.imuFlag(MbcImuFlag.Still) ? 1 : 0)
    // camera
    serial.writeValue("found", mbc.camFound() ? 1 : 0)
    serial.writeValue("blobX", mbc.camBlob(MbcCamBlob.X))
    serial.writeValue("hue", mbc.camColor(MbcCamColor.Hue))
    serial.writeValue("grey", mbc.camIsGrey() ? 1 : 0)
    serial.writeValue("motion", mbc.camMotion())
    serial.writeValue("spot1", mbc.camSpotColor(1))
    serial.writeValue("spot1v", mbc.camSpotVivid(1))
    serial.writeValue("spot1white", mbc.camSpotIs(1, MbcCamSpotKind.White) ? 1 : 0)
    basic.pause(500)
})
