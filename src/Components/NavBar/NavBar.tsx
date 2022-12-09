import React, {useCallback, useEffect, useState} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {ApiInfo} from "../../types";
import axiosApi from "../../axios-api";

const NavBar = () => {
	const [page, setPage] = useState<ApiInfo[]>([]);

	const [spinner, setSpinner] = useState(false);

	const location = useLocation();

	const fetchHeroes = useCallback(async () => {
			setSpinner(true);
			try {
				const response = await axiosApi('/pages.json');
				let heroes = [];
				if (response) {
					heroes = Object.keys(response.data).map(key => {
						return response.data[key]
					})
					setPage(heroes);
				}
			} finally {
				setSpinner(false);
			}
		}, []
	);

	useEffect(() => {
		fetchHeroes().catch(console.error);
	}, [fetchHeroes, location]);


	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
			<div className="container-fluid">
				<NavLink to='/' className="navbar-brand">Home</NavLink>
				<div className="collapse navbar-collapse d-flex justify-content-between">
					<ul className="navbar-nav mr-auto">
						{spinner ? (<div className="spinner-border text-success" role="status">
							</div>) :
							(page.map(item => (<li key={Math.random()} className="nav-item">
								<NavLink key={Math.random()} to={'/pages/' + item.page}
										 className="nav-link">{item.title}</NavLink>
							</li>)))
						}
					</ul>

					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<NavLink to='/admin/edit' className="nav-link">Edit</NavLink>
						</li>
						<li className="nav-item" >
							<NavLink to='/admin/add' className="nav-link">Add</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;