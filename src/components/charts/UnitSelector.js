import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const UnitSelector = ({ metricUnits, handleUnitChange }) => (
    <FormControl variant="outlined" style={{ minWidth: 120 }}>
      <InputLabel id="unit-selector-label">Units</InputLabel>
      <Select
        labelId="unit-selector-label"
        id="unit-selector"
        value={metricUnits ? 'metric' : 'imperial'}
        onChange={handleUnitChange}
        label="Units"
      >
        <MenuItem value="metric">Metric</MenuItem>
        <MenuItem value="imperial">Imperial</MenuItem>
      </Select>
    </FormControl>
  );

  
export default UnitSelector;