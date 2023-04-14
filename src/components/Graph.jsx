import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';

const data = [
  { device: 'Device 1', temperature: 20, humidity: 40 },
  { device: 'Device 2', temperature: 21, humidity: 42 },
  { device: 'Device 3', temperature: 22, humidity: 44 },
  { device: 'Device 4', temperature: 23, humidity: 45 },
  { device: 'Device 5', temperature: 22, humidity: 46 },
];

const useStyles = makeStyles({
  root: {
    width: 600,
    height: 400,
    margin: 'auto',
  },
});

function Graph() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="device" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="temperature" fill="#8884d8" />
        <Bar dataKey="humidity" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}

export default Graph;
