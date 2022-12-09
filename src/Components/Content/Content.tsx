import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ApiInfo} from "../../types";
import axiosApi from "../../axios-api";

const Content = () => {
	const {pageName} = useParams();

	const [spinner, setSpinner] = useState(false);

	const [hero, setHero] = useState<ApiInfo>({
		title: '',
		image: '',
		desc: '',
		page: '',
	});

	const fetchHeroes = useCallback(async () => {
			setSpinner(true);
			const url = '/pages/' + pageName + '.json'
			try {
				const response = await axiosApi<ApiInfo>(url);
				if (response) {
					setHero(response.data);
				}
			} finally {
				setSpinner(false);
			}
		}, [pageName]
	);


	useEffect(() => {
		fetchHeroes().catch(console.error);
	}, [fetchHeroes]);

	return (<>
		{spinner ? (<div className="spinner-border text-success" role="status">
			</div>) :
			(<div>
				<h1><img src={hero.image} alt="hero"/>{hero.title}</h1>
				<p dangerouslySetInnerHTML={{__html: hero.desc}}></p>
			</div>)}
	</>);
};

export default Content;