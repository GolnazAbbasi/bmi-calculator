import React, { Fragment, useState } from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { getData, storeData } from '../../helpers/localStorage';

const option = ['red', 'green', 'orange', 'blue'];

const Bar = ({ labelData, bmiData }) => {
	const [color, setColor] = useState('red');
	const [visible, setVisible] = useState(true);

	const handleClassName = () => {
		setVisible((prev) => !prev);
		storeData('visible', visible);
	};
	const handleChangeColor = (event) => {
		const colorName = event.target.value;
		setColor(colorName);
		storeData('colorChart', colorName);
	};

	const data = (canvas) => {
		const ctx = canvas.getContext('2d');
		const gradient = ctx.createLinearGradient(63, 81, 181, 700);
		gradient.addColorStop(0, '#929dd9');
		gradient.addColorStop(1, '#172b4d');

		return {
			labels: labelData,
			datasets: [
				{
					label: 'BMI',
					data: bmiData,
					backgroundColor: color,
					borderColor: '#3F51B5',
					pointRadius: 6,
					pointHoverRadius: 8,
					pointHoverBorderColor: 'white',
					pointHoverBorderWidth: 2,
				},
			],
		};
	};

	const options = {
		responsive: true,
		scales: {
			xAxes: [
				{
					scaleLabel: {
						display: true,
						labelString: 'Date',
						fontSize: 18,
						fontColor: 'white',
					},
					gridLines: {
						display: false,
						color: 'white',
					},
					ticks: {
						fontColor: 'white',
						fontSize: 16,
					},
				},
			],
			yAxes: [
				{
					scaleLabel: {
						display: true,
						labelString: 'BMI',
						fontSize: 18,
						fontColor: 'white',
					},
					gridLines: {
						display: false,
						color: 'white',
					},
					ticks: {
						fontColor: 'white',
						fontSize: 16,
						beginAtZero: true,
					},
				},
			],
		},
		tooltips: {
			titleFontSize: 13,
			bodyFontSize: 13,
		},
	};

	return (
		<Fragment>
			<div className="flex">
				<div className="flex wi">
					<p className="color"> Color</p>
					<select
						value={color}
						className="select"
						onChange={handleChangeColor}
					>
						{option.map((item, i) => {
							return (
								<option key={i} value={item} defaultValue="red">
									{item}
								</option>
							);
						})}
					</select>
				</div>
				<button
					className="calculate-btn mybtn"
					onClick={handleClassName}
				>
					{visible ? 'Hide' : 'Show'} Chart
				</button>
			</div>
			<div className={visible ? 'fadeIn' : 'fadeOut'}>
				<Line data={data} options={options} />
			</div>
		</Fragment>
	);
};

Bar.propTypes = {
	labelData: PropTypes.array,
	bmiData: PropTypes.array,
};

export default Bar;
