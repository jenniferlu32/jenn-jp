const { Sequelize, Model, STRING, DECIMAL, TEXT, INTEGER } = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:/jpfp', { logging: false });

class Student extends Model{};
Student.init({
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  imageUrl: {
    type: STRING,
    defaultValue: 'https://media4.s-nbcnews.com/j/newscms/2016_36/1685951/ss-160826-twip-05_8cf6d4cb83758449fd400c7c3d71aa1f.fit-760w.jpg'
  },
  gpa: {
    type: DECIMAL,
    validate: {
      min: 0,
      max: 4
    }
  }
}, { sequelize: db, timestamps: false, modelName: 'students' });

class Campus extends Model{};
Campus.init({
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
  imageUrl: {
    type: STRING,
    defaultValue: 'https://media4.s-nbcnews.com/j/newscms/2016_36/1685951/ss-160826-twip-05_8cf6d4cb83758449fd400c7c3d71aa1f.fit-760w.jpg'
    },
  description: {
    type: TEXT,
  },
  address: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  }
}, { sequelize: db, timestamps: false, modelName: 'campuses' });

Student.belongsTo(Campus);
Campus.hasMany(Student);

const syncAndSeed = async() => {
  await db.sync({ force: true });
  const [ moe, lucy, ethyl, larry ] = await Promise.all(
    [['moe smith', 3.5], ['lucy anderson', 3.8], ['ethyl johnson', 3.1], ['larry miller', 2.8]].map(student => {
      let name = student[0];
      let gpa = student[1];
      let [ firstName, lastName ] = [ name.split(' ')[0], name.split(' ')[1] ];
      let email = `${firstName}${lastName}@gmail.com`;
      return Student.create({ firstName, lastName, email, gpa });
    }),
  );
  const [ nyu, nyuDc, nyuLondon ] = await Promise.all(
    [['NYU', 'Washington Square Park, New York, NY 10003', 'New York University is a private research university in New York City. Chartered in 1831 by the New York State Legislature, NYU was founded by a group of New Yorkers led by then Secretary of the Treasury Albert Gallatin.'], ['NYU Washington DC', '1307 L St NW, Washington, DC 20005', 'The seat of politics and international relations in the United States, the city of Washington, DC, is alive with history in the making. At NYU Washington, DC, students engage deeply with politics, policy, business, journalism, and leadership through coursework and experiential learning in the nation’s capital. For an even more nuanced understanding of your field, the academic internship program offers the opportunity to gain course credit through the completion of an internship.'], ['NYU London', '6 Bedford Square, London WC1B 3RA, UK', "NYU London is an academic centre of New York University located in London, United Kingdom. It is one of NYU's 14 global academic centres, and the largest of these which does not grant its own degrees, hosting around 480 students each semester."]].map(school => {
      let name = school[0];
      let address = school[1];
      let description = school[2];
      return Campus.create({ name, address, description });
    }),
  );
  moe.campusId = nyu.id
  await moe.save()

  // moe.update({ campusId: nyu.id });
  lucy.update({ campusId: nyuDc.id });
  await lucy.save()

  ethyl.update({ campusId: nyuLondon.id });
  larry.update({ campusId: nyu.id });
};

module.exports = {
  db,
  syncAndSeed,
  models: { Campus, Student }
};
