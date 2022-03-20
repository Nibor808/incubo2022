import React, {useEffect, useState} from 'react';
import moment from 'moment';
import robin from '../styles/images/robin-head.jpeg';

type TimeValues = {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

export const About = () => {
    const [time, setTime] = useState<TimeValues>({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const timeActive = setInterval(getTime, 1000);

        return () => clearInterval(timeActive);
    }, []);

    const getTime = () => {
        const timeSinceStartDate = moment().diff([2016, 0, 1]);
        const activeTime = moment.duration(timeSinceStartDate);

        setTime({
            years: activeTime.years(),
            months: activeTime.months(),
            days: activeTime.days(),
            hours: activeTime.hours(),
            minutes: activeTime.minutes(),
            seconds: activeTime.seconds(),
        });
    };

    const renderInfoDisplay = () => {
        return `<pre>
var STATS = {
  "location": {
    "province": "Ontario",
    "country": "Canada",
  },
  "time_active": {
    "years": ${time.years},
    "months": ${time.months},
    "days": ${time.days},
    "hours": ${time.hours},
    "minutes": ${time.minutes},
    "seconds": ${time.seconds},
  },
  "skills": [
    "problem_solving",
    "clean_ui",
    "clean_code",
    "collaboration",
  ]
};
      </pre>`;
    };

    return (
        <div className="top-box d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center flex-column">
                <img src={robin} alt="me" height="350px" width="350px" className="img-fluid" />
                <h2>Robin Erickson</h2>
                <p>software developer</p>
                <p>Exploring technology one language at a time.</p>
            </div>

            <span dangerouslySetInnerHTML={{__html: renderInfoDisplay()}} />
        </div>
    );
};
