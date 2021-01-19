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
    // members: types.array(types.string),
  },
  {
    validation: {
      name: ['required'],
      lead: ['required'],
      // members
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
    },
  }
).actions(self => ({
  onSubmit: () => {
    setTimeout(() => {
      alert(JSON.stringify(getSnapshot(self), null, 2));
      // @ts-ignore
      self.setSubmitting(false);
    }, 400);
  },
}));
const createProjectForm = CreateProject.create({
  name: '',
  team: { name: '', lead: '' },
  milestones: [{ name: '' }],
});
// const createProject = CreateProjectForm.create();

const CreateProjectComponent = observer(() => {
  // @ts-ignore
  console.log(createProjectForm.errors, createProjectForm.touched.name);
  return (
    <div>
      <MstForm formInstance={createProjectForm}>
        <form
          // @ts-ignore
          onSubmit={createProjectForm.handleSubmit}
        >
          <div>
            Project name:
            {/* <input
              value={createProjectForm.name}
              name="name"
              // @ts-ignore
              onChange={createProjectForm.handleChange}
              // @ts-ignore
              onBlur={createProjectForm.handleBlur}
            /> */}
            <Field name="name" type="text" />
          </div>
          <div>
            <ErrorMessage name="name" />
            {/* {// @ts-ignore
            createProjectForm.errors.name &&
              // @ts-ignore
              createProjectForm.touched.name &&
              // @ts-ignore
              createProjectForm.errors.name} */}
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
          <div>
            {// @ts-ignore
            createProjectForm.errors.name &&
              // @ts-ignore
              createProjectForm.touched.name &&
              // @ts-ignore
              createProjectForm.errors.name}
          </div>
          {createProjectForm.milestones.map(milestone => {
            return (
              <>
                <div>
                  Milestone name:
                  <input
                    value={milestone.name}
                    name="name"
                    // @ts-ignore
                    onChange={milestone.handleChange}
                    // @ts-ignore
                    onBlur={milestone.handleBlur}
                  />
                </div>
                <div>
                  {// @ts-ignore
                  milestone.errors.name &&
                    // @ts-ignore
                    milestone.touched.name &&
                    // @ts-ignore
                    milestone.errors.name}
                </div>
              </>
            );
          })}
          <button type="submit">Submit</button>
        </form>
      </MstForm>
    </div>
  );
});

ReactDOM.render(<CreateProjectComponent />, document.getElementById('root'));
