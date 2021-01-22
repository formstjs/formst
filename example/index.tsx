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

const CreateProjectComponent = observer(() => {
  console.log(
    'createProjectForm &*&',
    getSnapshot(createProjectForm),
    createProjectForm.isSubmitting
  );
  return (
    <div>
      <MSTForm formInstance={createProjectForm}>
        <form onSubmit={createProjectForm.handleSubmit}>
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
            </MSTForm>
          </div>
          {createProjectForm.milestones.map((milestone, index) => {
            return (
              <MSTForm formInstance={milestone}>
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
          {/* {console.log(createProjectForm.isSubmitting, '')} */}
        </form>
      </MSTForm>
    </div>
  );
});

ReactDOM.render(<CreateProjectComponent />, document.getElementById('root'));
