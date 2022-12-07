import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ApiInfo} from "../../types";
import axiosApi from "../../axios-api";

const Content = () => {
    const {pageName} = useParams();

    const [hero, setHero] = useState<ApiInfo>( {
        title:'',
        image:'',
        desc: '',
    });

    const fetchHeroes = useCallback(async  () => {
        const url = '/pages/' + pageName + '.json'
        try {
            const response  = await axiosApi<ApiInfo>(url);
            if (response){
                setHero(response.data);
            }
        } finally {

        }}, [pageName]
    );

    useEffect(()=>{
        fetchHeroes().catch(console.error);
    }, [fetchHeroes]);

    return (
        <div>
            <h1>{hero.title}</h1>
            <p>{hero.desc}</p>
            <img src={hero.image} alt="hero"/>
        </div>
    );
};

export default Content;