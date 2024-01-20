import { PRESSURE_UNIT, RATIO_mmHg_hPa, RATIO_hPa_mmHg } from "./const";


export const getPressureRationByUnit = (unit: PRESSURE_UNIT) => {
    let ratio = 0;

    switch (unit) {
        case PRESSURE_UNIT.hPa:
            ratio = RATIO_mmHg_hPa;
            break;

        case PRESSURE_UNIT.mmHg:
            ratio = RATIO_hPa_mmHg;
            break;

        default:
            throw new Error(`Wrong unit: ${unit}`);
    }

    return ratio;
};
