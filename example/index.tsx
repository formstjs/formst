import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  createFormModel,
  defineValidators,
  ErrorMessage,
  Field,
  MstForm,
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
  return (
    <div>
      <MstForm formInstance={createProjectForm}>
        <form onSubmit={createProjectForm.handleSubmit}>
          <div>
            Project name:
            <Field name="name" type="text" />
          </div>
          <div>
            <ErrorMessage name="name" />
          </div>
          <div style={{ border: '1px solid black' }}>
            <MstForm formInstance={createProjectForm.team}>
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
            </MstForm>
          </div>
          {createProjectForm.milestones.map((milestone, index) => {
            return (
              <MstForm formInstance={milestone}>
                <div key={index}>
                  <div>
                    Milestone name:
                    <input
                      name="name"
                      value={milestone.name}
                      onChange={(event: any) => {
                        milestone.setValue(
                          'name',
                          event.target.value.toUpperCase()
                        );
                      }}
                      onBlur={milestone.handleBlur}
                    />
                    <ErrorMessage name="name" />
                  </div>
                </div>
              </MstForm>
            );
          })}
          <button type="submit">Submit</button>
        </form>
      </MstForm>
    </div>
  );
});

ReactDOM.render(<CreateProjectComponent />, document.getElementById('root'));
