import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../App/App.css';

const initialValues = {
	weight: '',
	height: '',
	date: '',
};

const BmiForm = ({ change,getValW,getValH,selectValueW, selectValueH }) => {
	const [state, setState] = useState(initialValues);

	const handleChange = (e) => {
		let { value, name } = e.target;
		if (value > 999) {
			value = 999;
		}
		const date = new Date().toLocaleString().split(',')[0];
		setState({
			...state,
			[name]: value,
			date,
			selectValueW,
            selectValueH
		});
	};

	const handleSubmit = () => {
		change(state);
		setState(initialValues);
	};

	return (
		<>
			<div className="row">
				<div className="col m6 s12">
					<div className="flx">
						<label htmlFor="weight">Weight</label>
						<select
							value={selectValueW}
							className="select"
							onChange={getValW}
						>
							<option value="pounds" defaultValue="">
								pounds
							</option>
							<option value="kilogram">kilograms</option>
						</select>
					</div>
					<input
						id="weight"
						name="weight"
						type="number"
						min="1"
						max="999"
						placeholder="50"
						value={state.weight}
						onChange={handleChange}
					/>
				</div>

				<div className="col m6 s12">
					<div className="flx">
						<label htmlFor="height">Height</label>
						<select
							value={selectValueH}
							className="select"
							onChange={getValH}
						>
							<option value="inch">inches</option>
							<option value="centimeter" defaultValue="">
								centimeters
							</option>
						</select>
					</div>
					<input
						id="height"
						name="height"
						type="number"
						min="1"
						max="999"
						placeholder="176"
						value={state.height}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="center">
				<button
					id="bmi-btn"
					className="calculate-btn"
					type="button"
					disabled={state.weight === '' || state.height === ''}
					onClick={handleSubmit}
				>
					Calculate BMI
				</button>
			</div>
		</>
	);
};

BmiForm.propTypes = {
	change: PropTypes.func.isRequired,
};

export default BmiForm;
