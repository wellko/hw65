import React, {useCallback, useEffect, useState} from 'react';
import {ApiInfo} from "../../types";
import axiosApi from "../../axios-api";
import {useLocation, useNavigate} from "react-router-dom";
import FroalaEditor from 'react-froala-wysiwyg';

const AdminForm = () => {
	const navigate = useNavigate();

	const {pathname} = useLocation();

	const check = /^[a-zA-Z0-9]+$/;

	const [spinner, setSpinner] = useState(false);

	const [pageName, setPageName] = useState('')

	const [hero, setHero] = useState<ApiInfo>({
		desc: '',
		image: '',
		title: '',
		page: '',
	});

	const [heroes, setHeroes] = useState<ApiInfo[]>([]);

	const fetchHeroes = useCallback(async () => {
			setSpinner(true);
			try {
				const response = await axiosApi('/pages.json');
				let heroesState = [];
				if (response) {
					heroesState = Object.keys(response.data).map(key => {
						return response.data[key]
					})
					setHeroes(heroesState);
				}
			} finally {
				setSpinner(false);
			}
		}, []
	);

	const autoInput = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		setHero(prev => ({...prev, page: e.target.value}));
		await setPageName(e.target.value);
	}

	useEffect(() => {
		fetchHeroes().catch(console.error);
	}, [fetchHeroes]);

	useEffect(() => {
		const filtered = heroes.filter(item => item.page === pageName)
		if (filtered.length > 0) {
			setHero(filtered[0]);
		} else if (pageName === '') {
			setHero({
				desc: '',
				image: '',
				title: '',
				page: '',
			})
		}
	}, [pageName, heroes])


	const ChangeEvent = (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>) => {
		const {name, value} = e.target;
		setHero(prev => ({...prev, [name]: value}));
	};

	const EditFunc = async (e: React.FormEvent) => {
		e.preventDefault();
		if (hero.page.length > 1 && hero.desc.length > 1 && hero.title.length > 1 && hero.image.length > 1) {
			if (check.test(hero.page)) {
				const url = '/pages/' + hero.page + '.json';
				try {
					await axiosApi.put(url, hero);
				} finally {
					navigate('/');
				}
			} else {
				alert('Page name must include only eng chars or numbers');
			}
		} else {
			alert('please fill all fields')
		}
	}

	const FroalaChange = (model: string) => {
		setHero(prev => ({...prev, desc: model}))
	}


	return (
		<>
			{spinner ? <div className="spinner-border text-success" role="status"/> :
				<form onSubmit={EditFunc}>
					<div className='d-flex flex-column text-center border-dark border border-4 rounded mt-5'>
						<h1>{(pathname === '/admin/edit') ? 'Edit Form' : 'Add Form'} </h1>
						<label htmlFor='page' className='fw-bold fs-4'>Page:</label>
						{(pathname === '/admin/edit') ?
							(<select name='page' onChange={autoInput} value={hero.page}>
								<option value=''>select any page</option>
								{heroes.map(item => <option key={Math.random()}
															value={item.page}> {item.page}</option>)}
							</select>) :
							(<input name='page' onChange={ChangeEvent} type='text'/>)}
						<label htmlFor='title' className='fw-bold fs-4 mt-4'>Title</label>
						<input className='w-75 align-self-center' value={hero.title} name='title' onChange={ChangeEvent}
							   type='text'/>
						<label htmlFor='desc' className='fw-bold fs-4 mt-4'>Content:</label>
						<FroalaEditor model={hero.desc} onModelChange={FroalaChange}/>
						<label htmlFor='image' className='fw-bold fs-4 mt-4'>Image:</label>
						<input className='mb-4 w-75 align-self-center' value={hero.image} name='image'
							   onChange={ChangeEvent}
							   type='url'/>
						<button className='btn btn-dark'
								type='submit'>{(pathname === '/admin/edit') ? 'Edit' : 'Add'}</button>
					</div>
				</form>
			}
		</>
	);
};

export default AdminForm;