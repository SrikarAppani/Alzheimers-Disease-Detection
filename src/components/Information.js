import React from 'react';
import './Information.css';

const Information = () => {
    return (
        <div className="information-container">
            <h1>About Alzheimer's Disease</h1>
            <p>
                Alzheimer's disease is a progressive neurological disorder that leads to the 
                degeneration and death of brain cells. It is the most common cause of dementia, 
                affecting memory, thinking, and behavior. Early symptoms often include memory loss 
                and confusion, while later stages can result in severe cognitive impairment and 
                loss of physical abilities.
            </p>

            <h2>Stages of Dementia</h2>
            <div className="stage">
                <h3>Mild Demented</h3>
                <p>
                    In the mild stage of dementia, individuals may experience subtle memory loss 
                    and difficulty with complex tasks. They may forget names, misplace objects, 
                    or struggle to find the right words during conversations. While independent 
                    functioning may still be possible, assistance may be needed for certain activities.
                </p>
            </div>

            <div className="stage">
                <h3>Moderate Demented</h3>
                <p>
                    Moderate dementia is marked by a more significant decline in cognitive function. 
                    Individuals may have trouble recognizing family members or friends and experience 
                    confusion about time and place. Daily activities, such as managing finances and 
                    personal hygiene, often require help. Behavioral changes, like increased agitation, 
                    are also common.
                </p>
            </div>

            <div className="stage">
                <h3>Non-Demented</h3>
                <p>
                    Non-demented individuals do not exhibit symptoms of cognitive impairment. They 
                    can think clearly, recall information, and perform daily tasks without significant 
                    challenges. Regular memory lapses, such as forgetting a name or misplacing keys, 
                    are normal and do not indicate dementia.
                </p>
            </div>

            <div className="stage">
                <h3>Very Mild Demented</h3>
                <p>
                    The very mild stage of dementia is often difficult to distinguish from normal 
                    age-related cognitive decline. People may experience minor forgetfulness and 
                    momentary lapses in memory but are usually able to carry out their usual activities. 
                    Family members may notice slight changes, but these may not be significant enough 
                    to impact daily functioning.
                </p>
            </div>
        </div>
    );
};

export default Information;
