import React, {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { Chart, registerables } from 'chart.js';
import MemeService from "../../../../../services/memeService";
Chart.register(...registerables, {
    id: 'category',
    isLinear: false,
    type: 'category'
});

function TemplateStatistics({template}) {
    const memeService = new MemeService();
    const [memes, setMemes] = useState([]);
    const d = new Date();
    const currentMonth = d.getMonth();
    const [templateUsage, setTemplateUsage] = useState(Array(currentMonth + 1).fill(0));

    useEffect(() => {
        const fetchMemes = async () => {
            const allMemes = await memeService.getAllMemes();
            setMemes(allMemes);
        };
        fetchMemes();
    }, [template.url]);

    const fillUpData = () => {
        const updatedUsage = [...templateUsage]; // create a copy of the state array to avoid mutation
        memes.forEach(meme => {
            if (meme.templates?.[0]?.src === template.url) {
                const memeDate = new Date(meme.creationDate);
                const memeMonth = memeDate.getMonth();
                updatedUsage[memeMonth]++;
            }
        });
        setTemplateUsage(updatedUsage);
    };

    useEffect(() => {
        fillUpData();
    }, [memes, template.image]);

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'template usage',
                data: templateUsage,
                fill: false,
                borderColor: 'black',
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: 10,
            },
        },
    };


    return (
        <div style={{height: "100%"}}>
            <Line data={data} options={options}/>
        </div>
    );
}

export default TemplateStatistics;