import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  createFormModel,
  defineValidators,
  ErrorMessage,
  Field,
  Formst,
  addMiddleware,
  observer,
} from '../.';
import { getSnapshot, types } from 'mobx-state-tree';

defineValidators({
  minLen: (value: any) => {
    return {
      valid: typeof value === 'string' && value.length > 3,
      message: 'Input should be more than 3 characters',
    };
  },
});

const Milestone = createFormModel(
  'Milestone',
  {
    name: types.string,
  },
  {
    validation: {
      name: name => {
        if (!name) {
          return 'Required';
        }
      },
    },
  }
);
const ProjectTeam = createFormModel(
  'ProjectTeam',
  {
    name: types.string,
    lead: types.string,
  },
  {
    validation: {
      name: 'required',
      lead: ['required', 'minLen'],
    },
  }
);
const CreateProject = createFormModel(
  'CreateProject',
  {
    name: types.string,
    milestones: types.array(Milestone),
    team: ProjectTeam,
  },
  {
    validation: {
      name: ['required'],
      milestones: 'valid',
      team: 'valid',
    },
  }
)
  .views(self => ({
    get totalMilestone() {
      return self.milestones.length;
    },
  }))
  .actions(self => ({
    onSubmit: () => {
      setTimeout(() => {
        alert(JSON.stringify(getSnapshot(self), null, 2));
        self.setSubmitting(false);
      }, 400);
    },
    addMilestone: ms => {
      const milestone = Milestone.create(ms);
      self.milestones.push(milestone);
    },
  }));
const createProjectForm = CreateProject.create({
  name: '',
  team: { name: '', lead: '' },
  milestones: [{ name: '' }],
});

addMiddleware(createProjectForm, (call, next, abort) => {
  if (call.name === 'setValue') {
    const fieldName = call.args[0];
    if (fieldName === 'name') {
      call.args[1] = call.args[1].toUpperCase();
    }
  }

  next(call);
});

const TodoForm = createFormModel(
  'TodoForm',
  {
    title: types.string,
    description: types.string,
  },
  {
    validation: {
      title: ['required', 'minLen'],
      description: 'required',
    },
  }
).actions(self => ({
  onSubmit: () => {
    setTimeout(() => {
      alert(JSON.stringify(getSnapshot(self), null, 2));
    }, 100);
  },
}));

const todoForm = TodoForm.create({
  title: '',
  description: '',
});

const addMilestone = () => {
  createProjectForm.addMilestone({ name: '' });
};

const CreateProjectComponent = observer(() => {
  console.log(
    'createProjectForm &*&',
    getSnapshot(createProjectForm),
    createProjectForm.isSubmitting,
    createProjectForm.name
  );
  return (
    <div>
      <Formst formInstance={createProjectForm}>
        <form key={'master'} onSubmit={createProjectForm.handleSubmit}>
          {createProjectForm.totalMilestone}
          <div>
            Project name:
            <Field name="name" type="text" />
            <input
              name="name"
              value={createProjectForm.name}
              onChange={createProjectForm.handleChange}
              onBlur={createProjectForm.handleBlur}
            />
          </div>
          <div>
            <ErrorMessage name="name" />
          </div>
          <div></div>
          <div style={{ border: '1px solid black' }}>
            <Formst formInstance={createProjectForm.team}>
              <div key={'second'}>
                <div>
                  Team name:
                  <Field name="name" type="text" />
                </div>
                <div>
                  <ErrorMessage name="name" />
                </div>
                <div>
                  Lead name:
                  <Field name="lead" type="text" />
                </div>
                <div>
                  <ErrorMessage name="lead" />
                </div>
              </div>
            </Formst>
          </div>
          {createProjectForm.milestones.map((milestone, index) => {
            return (
              <Formst formInstance={milestone} key={index}>
                <div key={index}>
                  <div>
                    Milestone name:
                    <input
                      name="name"
                      value={milestone.name}
                      onChange={milestone.handleChange}
                      onBlur={milestone.handleBlur}
                    />
                    <ErrorMessage name="name" />
                  </div>
                </div>
              </Formst>
            );
          })}
          <button type="button" onClick={addMilestone}>
            Add new milestone
          </button>
          <button type="submit">Submit</button>
          {createProjectForm.isSubmitting ? (
            <h1>submitting</h1>
          ) : (
            <h2>submitted</h2>
          )}

          {createProjectForm.isValid ? <h1>valid</h1> : <h2>not valid</h2>}
          {/* {console.log(createProjectForm.isSubmitting, '')} */}
        </form>
      </Formst>

      <Formst formInstance={todoForm}>
        <form onSubmit={todoForm.handleSubmit}>
          <Field name="title" />
          <ErrorMessage name="title" />
          <br />
          <Field name="description" />
          <ErrorMessage name="description" />
          <button type="submit">Submit</button>
        </form>
      </Formst>
    </div>
  );
});

ReactDOM.render(<CreateProjectComponent />, document.getElementById('root'));
