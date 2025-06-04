import { Tabs } from '../ui/tabs';
import TabContent from './TabContent';

const ProjectExp = ({ project }: { project: Project }) => {
    const tabs = [
        {
            title: 'Features',
            value: 'features',
            content: (
                <TabContent contents={project.features} />
            )
        },
        {
            title: 'Challenges',
            value: 'challenges',
            content: (
                <TabContent contents={project.challenges} />

            )
        },
        {
            title: 'Learnings',
            value: 'learnings',
            content: (
                <TabContent contents={project.learnings} />
            )
        },
        {
            title: 'Technologies',
            value: 'technologies',
            content: (
                <TabContent contents={project.technologies.map(tech => tech.title)} />
            )
        },
    ]

    return (
        <Tabs
            tabs={tabs}
            tabClassName=''
            containerClassName='flex-wrap'
            activeTabClassName='bg-violet-500'
        />
    )
}

export default ProjectExp

