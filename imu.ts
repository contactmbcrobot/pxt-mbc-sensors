/**
 * MBC IMU / gyro (I2C 0x6A), protocol v2 value table:
 * 01 gyro 3D heading, 02 fused heading, 03 gyro 1D heading, 04 magnetic heading (degrees, may exceed 360),
 * 05 yaw rate (0.1 deg/s), 06 pitch angle (deg), 07 pitch rate (0.1 deg/s),
 * 08 magnetic trust 0..255, 09 magnetic disturbance, 0A face up (0..5 = +X +Y +Z -X -Y -Z),
 * 10..12 gyro X Y Z (0.1 deg/s), 13..15 accel X Y Z (mg), 16..18 magnetic X Y Z (mG).
 * Commands: E0 zero heading, E1/E2 accelerometer calibration start/end, E3/E4 magnetometer calibration start/end.
 * Status F3: b0 ready, b1 still, b2 mounting axis captured, b3 mounted too tilted,
 *            b4 accel calibrating, b5 mag calibrating, b6 mag fusion initialised, b7 mag auto-calibration converged.
 */

enum MbcImuHeading {
    //% block="fused"
    Fused = 0x02,
    //% block="gyro 3D"
    Gyro3D = 0x01,
    //% block="gyro 1D"
    Gyro1D = 0x03,
    //% block="magnetic"
    Magnetic = 0x04
}

enum MbcImuSensor {
    //% block="gyro (0.1 °/s)"
    Gyro = 0x10,
    //% block="accelerometer (mg)"
    Accel = 0x13,
    //% block="magnetometer (mG)"
    Mag = 0x16
}

enum MbcAxis {
    //% block="X"
    X = 0,
    //% block="Y"
    Y = 1,
    //% block="Z"
    Z = 2
}

enum MbcImuFace {
    //% block="+X"
    PlusX = 0,
    //% block="+Y"
    PlusY = 1,
    //% block="+Z"
    PlusZ = 2,
    //% block="-X"
    MinusX = 3,
    //% block="-Y"
    MinusY = 4,
    //% block="-Z"
    MinusZ = 5
}

enum MbcImuCalib {
    //% block="accelerometer start"
    AccelStart = 0xE1,
    //% block="accelerometer end"
    AccelEnd = 0xE2,
    //% block="magnetometer start"
    MagStart = 0xE3,
    //% block="magnetometer end"
    MagEnd = 0xE4
}

enum MbcImuFlag {
    //% block="still"
    Still = 1,
    //% block="mounting axis captured"
    AxisCaptured = 2,
    //% block="mounted too tilted"
    TooTilted = 3,
    //% block="accelerometer calibrating"
    AccelCalibrating = 4,
    //% block="magnetometer calibrating"
    MagCalibrating = 5,
    //% block="magnetic fusion ready"
    MagFusionReady = 6,
    //% block="magnetic auto-calibration converged"
    MagConverged = 7
}

namespace mbc {
    const IMU_YAW_RATE = 0x05
    const IMU_PITCH = 0x06
    const IMU_PITCH_RATE = 0x07
    const IMU_MAG_TRUST = 0x08
    const IMU_MAG_DISTURB = 0x09
    const IMU_FACE_UP = 0x0A
    const IMU_CMD_ZERO = 0xE0

    let imuAddr = ADDR_IMU

    function imuGet(id: number): number {
        const v = readValue(imuAddr, id)
        return v == NONE ? 0 : v
    }

    /**
     * Use an IMU whose I2C address was changed (default 0x6A).
     * @param addr I2C address
     */
    //% blockId=mbc_imu_use_address block="IMU use address %addr"
    //% addr.shadow="mbc_addr_picker"
    //% group="IMU" weight=50 advanced=true
    export function imuUseAddress(addr: number): void {
        imuAddr = addr
    }

    /**
     * Heading in degrees (keeps counting past 360, negative = turned left). Fused = gyro + magnetometer.
     * @param kind heading source
     */
    //% blockId=mbc_imu_heading block="IMU heading %kind (°)"
    //% group="IMU" weight=100
    export function imuHeading(kind: MbcImuHeading): number {
        return imuGet(kind)
    }

    /**
     * Turn rate around the vertical axis in 0.1 °/s (123 = 12.3 °/s).
     */
    //% blockId=mbc_imu_yaw_rate block="IMU turn rate (0.1 °/s)"
    //% group="IMU" weight=99
    export function imuYawRate(): number {
        return imuGet(IMU_YAW_RATE)
    }

    /**
     * Pitch angle in degrees (nose up / down).
     */
    //% blockId=mbc_imu_pitch block="IMU pitch (°)"
    //% group="IMU" weight=98
    export function imuPitch(): number {
        return imuGet(IMU_PITCH)
    }

    /**
     * Pitch rate in 0.1 °/s.
     */
    //% blockId=mbc_imu_pitch_rate block="IMU pitch rate (0.1 °/s)"
    //% group="IMU" weight=97
    export function imuPitchRate(): number {
        return imuGet(IMU_PITCH_RATE)
    }

    /**
     * Raw sensor axis: gyro in 0.1 °/s, accelerometer in mg, magnetometer in mG.
     * @param sensor which sensor
     * @param axis X, Y or Z
     */
    //% blockId=mbc_imu_axis block="IMU %sensor axis %axis"
    //% group="IMU" weight=96
    export function imuAxis(sensor: MbcImuSensor, axis: MbcAxis): number {
        return imuGet(sensor + axis)
    }

    /**
     * Which face points up: 0 +X, 1 +Y, 2 +Z, 3 -X, 4 -Y, 5 -Z.
     */
    //% blockId=mbc_imu_face_up block="IMU face up"
    //% group="IMU" weight=95
    export function imuFaceUp(): number {
        return imuGet(IMU_FACE_UP)
    }

    /**
     * True when the given face points up.
     * @param face which face
     */
    //% blockId=mbc_imu_face_up_is block="IMU face up is %face"
    //% group="IMU" weight=94
    export function imuFaceUpIs(face: MbcImuFace): boolean {
        return imuGet(IMU_FACE_UP) == face
    }

    /**
     * Magnetic trust 0..255 (how much the magnetometer is believed).
     */
    //% blockId=mbc_imu_mag_trust block="IMU magnetic trust"
    //% group="IMU" weight=93 advanced=true
    export function imuMagTrust(): number {
        return imuGet(IMU_MAG_TRUST)
    }

    /**
     * Magnetic disturbance level 0..255 (higher = more interference).
     */
    //% blockId=mbc_imu_mag_disturbance block="IMU magnetic disturbance"
    //% group="IMU" weight=92 advanced=true
    export function imuMagDisturbance(): number {
        return imuGet(IMU_MAG_DISTURB)
    }

    /**
     * True when the IMU status flag is set.
     * @param flag status flag
     */
    //% blockId=mbc_imu_flag block="IMU is %flag"
    //% group="IMU" weight=91
    export function imuFlag(flag: MbcImuFlag): boolean {
        return statusBit(imuAddr, flag)
    }

    /**
     * Set all headings to 0 (E0).
     */
    //% blockId=mbc_imu_zero_heading block="IMU zero heading"
    //% group="IMU" weight=85
    export function imuZeroHeading(): void {
        writeCmd(imuAddr, IMU_CMD_ZERO, [])
    }

    /**
     * Start or end an accelerometer / magnetometer calibration (E1..E4). Results are saved in the IMU.
     * @param step calibration step
     */
    //% blockId=mbc_imu_calibrate block="IMU calibration %step"
    //% group="IMU" weight=84 advanced=true
    export function imuCalibrate(step: MbcImuCalib): void {
        writeCmd(imuAddr, step, [])
    }

    let imuTurnHandler: () => void = null
    let imuTurnDeg = 90
    let imuWatcher = false

    /**
     * Run code every time the fused heading has changed by the given degrees since the last event.
     * @param degrees turn in degrees, eg: 90
     */
    //% blockId=mbc_imu_on_turned block="on IMU turned by %degrees °"
    //% degrees.min=1 degrees.max=360 degrees.defl=90
    //% group="IMU" weight=80
    export function onImuTurned(degrees: number, handler: () => void): void {
        imuTurnDeg = Math.constrain(degrees | 0, 1, 360)
        imuTurnHandler = handler
        if (imuWatcher) return
        imuWatcher = true
        control.inBackground(() => {
            let ref = imuGet(MbcImuHeading.Fused)
            while (true) {
                const h = imuGet(MbcImuHeading.Fused)
                if (Math.abs(h - ref) >= imuTurnDeg) {
                    ref = h
                    if (imuTurnHandler) imuTurnHandler()
                }
                basic.pause(20)
            }
        })
    }
}
