import LoadingSpinner from '../../shared/components/LoadingSpinner';
import { useLabelsQuery } from '../hooks/useLabelsQuery';

export const LabelPicker = () => {

    /// 1. usar el hook que creamos para obtener las etiquetas
    const { labelsQuery } = useLabelsQuery();
    if (labelsQuery.isLoading) {
        return <div className='flex justify-center items-center h-52'> <LoadingSpinner/> </div>;
    }

    if (labelsQuery.isError) {
        return (
            <div className='text-red-500'>
                Error: {labelsQuery.error.message}
            </div>
        );
    }

    return (
        <div className='flex gap-2 flex-wrap'>
            {labelsQuery.data?.map((label) => (
                <span
                    key={label.id}
                    /*/// Usar el faceIn que configuramos, como lo llamas allá asi se usa aca la animación */
                    className='animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer'
                    style={{
                        border: `1px solid #${label.color}`,
                        color: `#${label.color}`,
                    }}
                >
                    {label.name}
                </span>
            ))}
        </div>
    );
};
