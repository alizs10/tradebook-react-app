import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { getPlans } from '../Services/DataLoader';
import Plan from './Plan';

const PanelPlans = () => {

    const [plans, setPlans] = useState([])

    useEffect(async () => {

        let unmounted = false;

        if (!unmounted) {
            try {
                const { status, data } = await getPlans()

                if (status == 200) {
                    let unsortedPlans = data.plans;
                    let sortedPlans = unsortedPlans.sort(function (a, b) {
                        return (a.price - b.price);
                    });
                    setPlans(sortedPlans)
                }
            } catch (error) {

            }

        }

        return () => {
            unmounted = true;
        }
    }, [])

    return (
        <Fragment>

            <Helmet>
                <title>اشتراک ها - تریدبوک</title>
            </Helmet>

            <div className="mr-2 mt-4">
                <h2 className="text-slate-300 text-lg">خرید اشتراک
                </h2>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-2 mt-4">


                {plans.map((plan, index) => (
                    <Plan key={plan.id} plan={plan} index={index} length={plans.length} />
                ))}

            </div>


        </Fragment>
    );
}

export default PanelPlans;