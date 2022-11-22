// 首字母大写
const toUpperCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

module.exports = {
  description: 'Create React view',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '请输入app名称（Please enter the app name）',
    },
  ],
  actions: (data) => {
    const { name } = data;
    const upperFirstName = toUpperCase(name);

    const actions = [];
    if (name) {
      actions.push(
        {
          type: 'add',
          path: `./packages/${name}/package.json`,
          templateFile: './scripts/plop/app/package.hbs',
          data: {
            name,
            upperFirstName,
          },
        },
        {
          type: 'add',
          path: `./packages/${name}/.umirc.ts`,
          templateFile: './scripts/plop/app/umirc.hbs',
          data: {
            name,
            upperFirstName,
          },
        },
        {
          type: 'add',
          path: `./packages/${name}/tsconfig.json`,
          templateFile: './scripts/plop/app/tsconfig.hbs',
          data: {
            name,
            upperFirstName,
          },
        },
        {
          type: 'add',
          path: `./packages/${name}/typings.d.ts`,
          templateFile: './scripts/plop/app/typings.hbs',
          data: {
            name,
            upperFirstName,
          },
        },
        // src
        {
          type: 'add',
          path: `./packages/${name}/src/app.ts`,
          templateFile: './scripts/plop/app/src/app.hbs',
          data: {
            name,
            upperFirstName,
          },
        },
        {
          // Home/index.tsx
          type: 'add',
          path: `./packages/${name}/src/pages/Home/index.tsx`,
          templateFile: './scripts/plop/app/src/pages/Home/index.hbs',
          data: {
            name,
            upperFirstName,
          },
        },
        {
          // Home/indexless.tsx
          type: 'add',
          path: `./packages/${name}/src/pages/Home/index.less`,
          templateFile: './scripts/plop/app/src/pages/Home/indexless.hbs',
          data: {
            name,
            upperFirstName,
          },
        },
      );
    }

    return actions;
  },
};
