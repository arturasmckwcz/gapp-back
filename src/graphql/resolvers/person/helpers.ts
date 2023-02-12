import { Gender, Location, Person, PersonCreationAttributes } from '../../../models';

export const getPersons = (): Promise<Person[]> => {
  try {
    return Person.findAll({
      include: [
        { model: Location, as: 'place', foreignKey: 'placeId' },
        { model: Location, as: 'placeOfBirth', foreignKey: 'pobId' },
      ],
    });
  } catch (error) {
    throw error;
  }
};

export const addPerson = async (attributes: {
  firstName: string;
  lastName: string;
  gender: Gender;
  dob: string;
  middleName?: string;
  placeId?: string;
  pobId?: string;
  dod?: string;
}): Promise<boolean> => {
  const personAttributes: PersonCreationAttributes = {
    ...attributes,
    dob: new Date(attributes.dob),
    dod: attributes.dod ? new Date(attributes.dod) : undefined,
  };
  try {
    await Person.create(personAttributes);
    return true;
  } catch (error) {
    console.log('ERROR {model: Person, method: save}:', (error as Error).message);
  }
  return false;
};
