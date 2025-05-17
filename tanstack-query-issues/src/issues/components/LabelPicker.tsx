import LoadingSpinner from '../../shared/components/LoadingSpinner';
import { useLabelsQuery } from '../hooks/useLabelsQuery';

/// 1 Recibir estas propiedades
interface LabelPickerProps {
    labels: string[];
    onLabelsSelected: (label: string) => void;}

export const LabelPicker = ({ onLabelsSelected, labels }:LabelPickerProps) => {

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
                    /*/// 2. se agrega el onclick y la clase de seleccionado o no que es de css  */
                    onClick={() => onLabelsSelected(label.name)}
                    className={`animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer ${
                        labels.includes(label.name)
                            ? 'selected-label '
                            : ''
                    }`}
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
