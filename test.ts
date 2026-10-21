// Compile test: every block is called at least once (compiled only when this extension itself is built).
// Simulator: I2C reads 0 and i2cWriteBuffer returns undefined -> nothing must crash, values just read 0.
// Hardware: connect any MBC sensor to P19 (SCL) / P20 (SDA), press A to print device info on the serial
// console, then watch the values of the product you connected. Pass = numbers change when you move the robot / press buttons.

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
