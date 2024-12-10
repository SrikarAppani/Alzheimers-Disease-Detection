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

            <h1>What causes Alzheimer’s disease?</h1>

            <p>
                An abnormal build-up of proteins in your brain causes Alzheimer’s disease. The
                build-up of these proteins — amyloid protein and tau protein — causes brain 
                cells to die.

                The human brain contains over 100 billion nerve cells and other cells. The nerve 
                cells work together to fulfill all the communications needed to perform functions 
                such as thinking, learning, remembering and planning.
            </p>

            <p>
                Scientists believe that amyloid protein builds up in your brain cells, forming 
                larger masses called plaques. Twisted fibers of another protein called tau form 
                into tangles. These plaques and tangles block the communication between nerve 
                cells, which prevents them from carrying out their processes.
            </p>

            <p>
                The slow and ongoing death of the nerve cells results in the symptoms of Alzheimer’s 
                disease. Nerve cell death starts in one area of your brain (usually in the area of 
                your brain that controls memory — the hippocampus) and then spreads to other areas.
            </p>

            <p>
                Despite ongoing research, scientists still don’t know what exactly causes these 
                proteins to build up. So far, they believe that a genetic mutation may cause 
                early-onset Alzheimer’s. They think that late-onset Alzheimer’s happens due 
                to a complex series of brain changes that may occur over decades. A combination 
                of genetic, environmental and lifestyle factors likely contribute to the cause.
            </p>

            <h1>Can I reduce my risk of developing Alzheimer’s disease?</h1>

            <p>
                While there are some risk factors for Alzheimer’s you can’t change, like age 
                and genetics, you may be able to manage other factors to help reduce your risk.
            </p>

            <p>Risk factors for Alzheimer’s disease include:</p>

            <ul>
                <li>Age (increasing age is the main risk factor)</li>
                <li>Genetics</li>
                <li>Traumatic head injury</li>
                <li>Depression</li>
                <li>Cardiovascular disease and cerebrovascular disease</li>
                <li>High blood pressure</li>
                <li>High cholesterol</li>
            </ul>

            <p>
                Research shows that having a healthy lifestyle helps protect your brain from 
                cognitive decline. The following strategies may help decrease your risk of 
                developing Alzheimer’s disease:
            </p>

            <ul>
                <li><strong>Stay mentally active:</strong> Play board games, read, do crossword puzzles, play a musical instrument or do other hobbies that require “brain power.”</li>
                <li><strong>Get physically active:</strong>  Exercise increases blood flow and oxygen to your brain, which may affect brain cell health. Wear protective headgear if you’re participating in activities that increase your risk of a head injury.</li>
                <li><strong>Stay socially active: </strong> Regularly talk with friends and family and join in on group activities, such as religious services, exercise classes, book clubs or community volunteer work.</li>
                <li><strong>Eat healthily:</strong>  Follow the Mediterranean or DASH diet or another healthy diet that includes antioxidants. Consume alcoholic beverages in moderation.</li>
            </ul>

            <h2>Stages of Dementia</h2>

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
                <h6 className="symptoms-title">Symptoms of Very Mild Dementia:</h6>
                <ul className="symptoms-list">
                    <li><strong>Memory loss:</strong> Trouble remembering recent events or newly learned information. They may also ask the same question repeatedly.</li>
                    <li><strong>Trouble with problem-solving:</strong> Difficulty with complex tasks, planning, and making sound judgments.</li>
                    <li><strong>Personality changes:</strong> Becoming withdrawn, irritable, or angry, with reduced motivation to complete tasks.</li>
                    <li><strong>Trouble organizing and expressing thoughts:</strong> Difficulty finding the right words or clearly expressing ideas.</li>
                    <li><strong>Getting lost or misplacing belongings:</strong> Increasing trouble finding their way, even in familiar places.</li>
                </ul>
            </div>
            <div className="stage">
                <h3>Mild Demented</h3>
                <p>
                    In the mild stage of dementia, individuals may experience subtle memory loss
                    and difficulty with complex tasks. They may forget names, misplace objects,
                    or struggle to find the right words during conversations. While independent
                    functioning may still be possible, assistance may be needed for certain activities.
                </p>
                <h6 className="symptoms-title">Symptoms of Mild Dementia:</h6>
                <ul className="symptoms-list">
                    <li><strong>Memory loss:</strong> Trouble remembering recent events or newly learned information. They may also ask the same question repeatedly.</li>
                    <li><strong>Difficulty with tasks:</strong> They may have trouble with problem-solving, complex tasks, or sound judgments.</li>
                    <li><strong>Personality changes:</strong> Becoming withdrawn, irritable, or angry, with reduced motivation to complete tasks.</li>
                    <li><strong>Trouble organizing and expressing thoughts:</strong> Difficulty finding the right words or clearly expressing ideas.</li>
                    <li><strong>Getting lost or misplacing belongings:</strong> Increasing trouble finding their way, even in familiar places.</li>
                    <li><strong>Recognizing familiar faces:</strong> They may have no problem recognizing familiar faces.</li>
                    <li><strong>Traveling to familiar places:</strong> They may be able to usually travel to familiar places</li>
                </ul>
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
                <h6 className="symptoms-title">Symptoms of Moderate Dementia:</h6>
                <ul className="symptoms-list">
                    <li><strong>Confusion and forgetfulness:</strong>  They may have difficulty remembering events and details, such as where they went to school or their phone number. They may also have trouble recognizing friends and family.</li>
                    <li><strong>Personality changes:</strong> They may become agitated, act out, or show depression, anxiety, or apathy. They may also develop delusions, or groundless suspicions about their family, friends, or caregivers. </li>
                    <li><strong>Sleep disturbances:</strong> They may have trouble sleeping, or they may sleep during the day and feel restless at night. </li>
                    <li><strong>Wandering</strong>They may begin to wander from their living area. </li>
                    <li><strong>Safety issues: </strong> They may leave the stove on, burn food, or start fires. </li>
                </ul>
            </div>


        </div>
    );
};

export default Information;