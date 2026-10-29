/**
 * MBC IMU / gyro (I2C 0x6A), protocol v2 value table:
 * 01 gyro 3D heading, 02 fused heading, 03 gyro 1D heading, 04 magnetic heading (degrees, may exceed 360),
 * 05 yaw rate (0.1 deg/s), 06 pitch angle (deg), 07 pitch rate (0.1 deg/s),
 * 08 magnetic trust 0..255, 09 magnetic disturbance, 0A face up (0..5 = +X +Y +Z -X -Y -Z),
 * 10..12 gyro X Y Z (0.1 deg/s), 13..15 accel X Y Z (mg), 16..18 magnetic X Y Z (mG).
 * 0B command state = (last command << 8) | state (0 done, 1 busy, 2 failed, 3 rejected).
 * Commands: E0 zero heading, E1/E2 accelerometer calibration start/end, E3/E4 magnetometer calibration start/end,
 * E5 [int16 LE] set heading, E6 magnetic north = 0, E7 re-estimate gyro bias, E8 re-capture mounting axis, E9 cancel calibration,
 * EA [uint16 LE] heading correction (0.1 deg per turn, 3500..3700, 0 = 360.0), EB [A5] calibration factory reset.
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
    MagEnd = 0xE4,
    //% block="cancel"
    Cancel = 0xE9
}

enum MbcImuMaint {
    //% block="re-estimate gyro bias (keep still)"
    GyroBias = 0xE7,
    //% block="re-capture mounting axis"
    RecaptureAxis = 0xE8,
    //% block="calibration factory reset"
    CalibFactoryReset = 0xEB
}

enum MbcImuCmdState {
    //% block="done"
    Done = 0,
    //% block="busy"
    Busy = 1,
    //% block="failed"
    Failed = 2,
    //% block="rejected"
    Rejected = 3
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
    const IMU_CMD_STATE = 0x0B
    const IMU_CMD_SET_HEADING = 0xE5
    const IMU_CMD_NORTH = 0xE6
    const IMU_CMD_CORRECTION = 0xEA

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
    //% help=github:mbc-sensors/docs/imu-use-address
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
    //% help=github:mbc-sensors/docs/imu-heading
    //% group="IMU" weight=100
    export function imuHeading(kind: MbcImuHeading): number {
        return imuGet(kind)
    }

    /**
     * Turn rate around the vertical axis in 0.1 °/s (123 = 12.3 °/s).
     */
    //% blockId=mbc_imu_yaw_rate block="IMU turn rate (0.1 °/s)"
    //% help=github:mbc-sensors/docs/imu-yaw-rate
    //% group="IMU" weight=99
    export function imuYawRate(): number {
        return imuGet(IMU_YAW_RATE)
    }

    /**
     * Pitch angle in degrees (nose up / down).
     */
    //% blockId=mbc_imu_pitch block="IMU pitch (°)"
    //% help=github:mbc-sensors/docs/imu-pitch
    //% group="IMU" weight=98
    export function imuPitch(): number {
        return imuGet(IMU_PITCH)
    }

    /**
     * Pitch rate in 0.1 °/s.
     */
    //% blockId=mbc_imu_pitch_rate block="IMU pitch rate (0.1 °/s)"
    //% help=github:mbc-sensors/docs/imu-pitch-rate
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
    //% help=github:mbc-sensors/docs/imu-axis
    //% group="IMU" weight=96
    export function imuAxis(sensor: MbcImuSensor, axis: MbcAxis): number {
        return imuGet(sensor + axis)
    }

    /**
     * Which face points up: 0 +X, 1 +Y, 2 +Z, 3 -X, 4 -Y, 5 -Z.
     */
    //% blockId=mbc_imu_face_up block="IMU face up"
    //% help=github:mbc-sensors/docs/imu-face-up
    //% group="IMU" weight=95
    export function imuFaceUp(): number {
        return imuGet(IMU_FACE_UP)
    }

    /**
     * True when the given face points up. False when the IMU does not answer.
     * @param face which face
     */
    //% blockId=mbc_imu_face_up_is block="IMU face up is %face"
    //% help=github:mbc-sensors/docs/imu-face-up-is
    //% group="IMU" weight=94
    export function imuFaceUpIs(face: MbcImuFace): boolean {
        const v = readValue(imuAddr, IMU_FACE_UP)
        return v != NONE && v == face   // no IMU: never "yes" (0 would look like +X)
    }

    /**
     * Magnetic trust 0..255 (how much the magnetometer is believed).
     */
    //% blockId=mbc_imu_mag_trust block="IMU magnetic trust"
    //% help=github:mbc-sensors/docs/imu-mag-trust
    //% group="IMU" weight=93 advanced=true
    export function imuMagTrust(): number {
        return imuGet(IMU_MAG_TRUST)
    }

    /**
     * Magnetic disturbance level 0..255 (higher = more interference).
     */
    //% blockId=mbc_imu_mag_disturbance block="IMU magnetic disturbance"
    //% help=github:mbc-sensors/docs/imu-mag-disturbance
    //% group="IMU" weight=92 advanced=true
    export function imuMagDisturbance(): number {
        return imuGet(IMU_MAG_DISTURB)
    }

    /**
     * True when the IMU status flag is set.
     * @param flag status flag
     */
    //% blockId=mbc_imu_flag block="IMU is %flag"
    //% help=github:mbc-sensors/docs/imu-flag
    //% group="IMU" weight=91
    export function imuFlag(flag: MbcImuFlag): boolean {
        return statusBit(imuAddr, flag)
    }

    /**
     * Set all headings to 0 (E0).
     */
    //% blockId=mbc_imu_zero_heading block="IMU zero heading"
    //% help=github:mbc-sensors/docs/imu-zero-heading
    //% group="IMU" weight=85
    export function imuZeroHeading(): void {
        writeCmd(imuAddr, IMU_CMD_ZERO, [])
    }

    /**
     * Start or end an accelerometer / magnetometer calibration (E1..E4). Results are saved in the IMU.
     * @param step calibration step
     */
    //% blockId=mbc_imu_calibrate block="IMU calibration %step"
    //% help=github:mbc-sensors/docs/imu-calibrate
    //% group="IMU" weight=84 advanced=true
    export function imuCalibrate(step: MbcImuCalib): void {
        writeCmd(imuAddr, step, [])
    }

    /**
     * Set all headings to the given angle (E5, int16). Rejected while calibrating.
     * @param degrees heading in degrees, eg: 90
     */
    //% blockId=mbc_imu_set_heading block="IMU set heading to %degrees °"
    //% help=github:mbc-sensors/docs/imu-set-heading
    //% degrees.min=-360 degrees.max=360 degrees.defl=90
    //% group="IMU" weight=83
    export function imuSetHeading(degrees: number): void {
        const v = Math.constrain(Math.round(degrees), -32768, 32767) & 0xFFFF
        writeCmd(imuAddr, IMU_CMD_SET_HEADING, [v & 0xFF, v >> 8])
    }

    /**
     * Make the gyro heading show the magnetic compass direction 0..359 (E6, magnetic north = 0). Takes up to about 3 s. Rejected while calibrating.
     */
    //% blockId=mbc_imu_zero_north block="IMU heading from magnetic north"
    //% help=github:mbc-sensors/docs/imu-zero-north
    //% group="IMU" weight=82 advanced=true
    export function imuZeroNorth(): void {
        writeCmd(imuAddr, IMU_CMD_NORTH, [])
    }

    /**
     * Maintenance (E7 / E8 / EB): re-estimate the gyro bias (keep still about 1.5 s), re-capture the mounting axis, or reset all calibration to factory values.
     * @param action what to do
     */
    //% blockId=mbc_imu_maintenance block="IMU %action"
    //% help=github:mbc-sensors/docs/imu-maintenance
    //% group="IMU" weight=81 advanced=true
    export function imuMaintenance(action: MbcImuMaint): void {
        writeCmd(imuAddr, action, action == MbcImuMaint.CalibFactoryReset ? [0xA5] : [])
    }

    /**
     * Heading correction (EA): real degrees per full turn x 10, 3500..3700; 0 = back to 360.0. Saved in the IMU, heading is zeroed.
     * @param tenths 0 or 3500..3700, eg: 3600
     */
    //% blockId=mbc_imu_heading_correction block="IMU heading correction %tenths (0.1 ° per turn)"
    //% help=github:mbc-sensors/docs/imu-heading-correction
    //% tenths.min=0 tenths.max=3700 tenths.defl=3600
    //% group="IMU" weight=79 advanced=true
    export function imuHeadingCorrection(tenths: number): void {
        const v = Math.constrain(tenths | 0, 0, 65535)
        writeCmd(imuAddr, IMU_CMD_CORRECTION, [v & 0xFF, v >> 8])
    }

    /**
     * True when the last command (E1..EB) is in the given state (value 0B: done, busy, failed, rejected).
     * @param state command state
     */
    //% blockId=mbc_imu_command_is block="IMU last command is %state"
    //% help=github:mbc-sensors/docs/imu-command-is
    //% group="IMU" weight=78 advanced=true
    export function imuCommandIs(state: MbcImuCmdState): boolean {
        const v = readValue(imuAddr, IMU_CMD_STATE)
        return v != NONE && (v & 0xFF) == state
    }

    /**
     * Wait until the last command is no longer busy (or the timeout passes). True = it finished as "done".
     * @param timeout max wait in ms, eg: 5000
     */
    //% blockId=mbc_imu_wait_command block="IMU wait for command to finish (timeout %timeout ms)"
    //% help=github:mbc-sensors/docs/imu-wait-command
    //% timeout.min=100 timeout.max=30000 timeout.defl=5000
    //% group="IMU" weight=77 advanced=true
    export function imuWaitCommand(timeout: number): boolean {
        const end = control.millis() + timeout
        while (true) {
            const v = readValue(imuAddr, IMU_CMD_STATE)
            if (v != NONE && (v & 0xFF) != MbcImuCmdState.Busy) return (v & 0xFF) == MbcImuCmdState.Done
            if (control.millis() >= end) return false
            basic.pause(20)
        }
    }

    let imuTurnHandler: () => void = null
    let imuTurnDeg = 90
    let imuWatcher = false

    /**
     * Run code every time the fused heading has changed by the given degrees since the last event.
     * @param degrees turn in degrees, eg: 90
     */
    //% blockId=mbc_imu_on_turned block="on IMU turned by %degrees °"
    //% help=github:mbc-sensors/docs/imu-on-turned
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
