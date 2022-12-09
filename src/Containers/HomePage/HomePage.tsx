import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "../../axios-api";
import {ApiInfo} from "../../types";
import {NavLink} from "react-router-dom";

const HomePage = () => {
	const [pages, setPages] = useState<ApiInfo[]>([]);

	const fetchHeroes = useCallback(async () => {
			try {
				const response = await axiosApi('/pages.json');
				let heroes = [];
				if (response) {
					heroes = Object.keys(response.data).map(key => {
						return response.data[key]
					})
					setPages(heroes);
				}
			} finally {

			}
		}, []
	);

	useEffect(() => {
		fetchHeroes().catch(console.error);
	}, [fetchHeroes]);

	return (
		<div className='container'>
			{pages.map(item => {
				const link = '/pages/' + item.title;
				return (
					<NavLink key={Math.random()} to={link}> <img src={item.image} alt={item.title} key={Math.random()}/>
					</NavLink>)
			})}
		</div>
	);
};

export default HomePage;