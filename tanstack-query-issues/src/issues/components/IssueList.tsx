import { GithubIssue } from '../interfaces/issue.interface';
import { IssueItem } from './IssueItem';


interface IssueListProps {
  issues: GithubIssue[];
  /// recibir función para cambiar el estado
  state: string;
  onStateChange: (state: string) => void;
}

export const IssueList = ({ issues, onStateChange, state } : IssueListProps ) => {
  return (
      <>
          {/* Botones de All, Open, Closed */}
          <div className='flex gap-4'>
              <button
              /*/// Asignar estados  */
                  onClick={() => onStateChange('all')}
                  className={'btn' + (state === 'all' ? 'btn-active' : '')}
              >
                  All
              </button>
              {/* La clase se la ponemos condicional dependiento del estado selecionado */}
              <button onClick={() => onStateChange('open')} className={'btn' + (state === 'open' ? 'btn-active' : '')}>
                  Open
              </button>
              <button onClick={() => onStateChange('closed')} className={'btn' + (state === 'closed' ? 'btn-active' : '')}>
                  Closed
              </button>
          </div>

          {/* Lista de issues */}
          <div className='mt-4'>
              {issues.map((issue) => (
                  <IssueItem key={issue.id} issue={issue} />
              ))}
          </div>
      </>
  );
};
