import React, {useCallback, useEffect, useState} from 'react';
import {ApiInfo} from "../../types";
import axiosApi from "../../axios-api";
import {useNavigate} from "react-router-dom";

const AdminForm = () => {
    const navigate = useNavigate();

    const [hero, setHero] = useState<ApiInfo>({
        desc: '',
        image: '',
        title: '',
    });

    const [heroes, setHeroes] = useState<ApiInfo[]>([]);

    const fetchHeroes = useCallback(async () => {
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

            }
        }, []
    );

    const fetchHero = useCallback(async () => {
            if (hero.title.length > 1) {
                const url = '/pages/' + hero.title + '.json'
                try {
                    const response = await axiosApi<ApiInfo>(url);
                    if (response) {
                        setHero(response.data);
                    }
                } finally {

                }
            } else {
                setHero({
                    desc: '',
                    image: '',
                    title: '',
                })
            }

        }, [hero.title]
    );

    useEffect(() => {
        fetchHeroes().catch(console.error);
        fetchHero().catch(console.error);
    }, [fetchHeroes, fetchHero]);


    const ChangeEvent = (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>) => {
        const {name, value} = e.target;
        setHero(prev => ({...prev, [name]: value}));
    };

    const EditFunc = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = '/pages/' + hero.title + '.json';
        try {
            await axiosApi.put(url, hero);
        } finally {
            navigate('/');
        }
    }

    return (
        <>
            <form onSubmit={EditFunc}>
                <div className='d-flex flex-column text-center border-dark border border-4 rounded mt-5'>
                    <label  htmlFor='title' className='fw-bold fs-4'>Page name:</label>
                    <select name='title' onChange={ChangeEvent} value={hero.title}>
                        <option value=''>select any page</option>
                        {heroes.map(item => <option key={Math.random()} value={item.title}> {item.title}</option>)}
                    </select>
                    <label  htmlFor='desc' className='fw-bold fs-4 mt-4'>Content:</label>
                    <textarea value={hero.desc} name='desc' onChange={ChangeEvent}/>
                    <label  htmlFor='image' className='fw-bold fs-4 mt-4'>Image:</label>
                    <input className='w-75 align-self-center' value={hero.image} name='image' onChange={ChangeEvent}
                           type='url'/>
                    <button type='submit'> Edit</button>
                </div>
            </form>
        </>
    );
};

export default AdminForm;