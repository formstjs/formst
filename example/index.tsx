import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  createFormModel,
  defineValidators,
  ErrorMessage,
  Field,
  MSTForm,
} from '../.';
import { getSnapshot, types } from 'mobx-state-tree';
import { observer } from 'mobx-react-lite';

defineValidators({
  minLen: (value: any) => ({
    valid: typeof value === 'string' && value.length < 8,
    message: 'String is greater than 8 chars',
  }),
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
    preprocessor: {
      name: (value: string) => value.toUpperCase(),
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
    preprocessor: {
      name: (value: string) => value.toUpperCase(),
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
    preprocessor: {
      name: (value: string) => value.toUpperCase(),
    },
  }
).actions(self => ({
  changeValue: (value: string) => {
    self.name = value.toUpperCase();
  },
  onSubmit: () => {
    setTimeout(() => {
      alert(JSON.stringify(getSnapshot(self), null, 2));
      self.setSubmitting(false);
    }, 400);
  },
}));
const createProjectForm = CreateProject.create({
  name: '',
  team: { name: '', lead: '' },
  milestones: [{ name: '' }],
});

const TodoForm = createFormModel(
  'TodoForm',
  {
    title: types.string,
    description: types.string,
  },
  {
    validation: {
      title: ['required'],
      description: 'required',
    },
    preprocessor: {
      title: (value: string) => value.toUpperCase(),
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

const CreateProjectComponent = observer(() => {
  console.log(
    'createProjectForm &*&',
    getSnapshot(createProjectForm),
    createProjectForm.isSubmitting
  );
  return (
    <div>
      <MSTForm formInstance={createProjectForm}>
        <form key={'master'} onSubmit={createProjectForm.handleSubmit}>
          <div>
            Project name:
            <Field name="name" type="text" />
            <input
              name="name"
              value={createProjectForm.name}
              onChange={event => {
                createProjectForm.changeValue(event.target.value);
              }}
              onBlur={createProjectForm.handleBlur}
            />
          </div>
          <div>
            <ErrorMessage name="name" />
          </div>
          <div style={{ border: '1px solid black' }}>
            <MSTForm formInstance={createProjectForm.team}>
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
            </MSTForm>
          </div>
          {createProjectForm.milestones.map((milestone, index) => {
            return (
              <MSTForm formInstance={milestone} key={index}>
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
              </MSTForm>
            );
          })}
          <button type="submit">Submit</button>
          {createProjectForm.isSubmitting ? (
            <h1>submitting</h1>
          ) : (
            <h2>submitted</h2>
          )}

          {createProjectForm.isValid ? <h1>valid</h1> : <h2>not valid</h2>}
          {/* {console.log(createProjectForm.isSubmitting, '')} */}
        </form>
      </MSTForm>

      <MSTForm formInstance={todoForm}>
        <form onSubmit={todoForm.handleSubmit}>
          <Field name="title" />
          <ErrorMessage name="title" />
          <br />
          <Field name="description" />
          <ErrorMessage name="description" />
          <button type="submit">Submit</button>
        </form>
      </MSTForm>
    </div>
  );
});

ReactDOM.render(<CreateProjectComponent />, document.getElementById('root'));
