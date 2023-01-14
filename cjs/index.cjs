/**
 * Given any input, if it's an object or an array, sort all nested objects by key,
 * otherwise returns the best way for comparing the object.
 * @todo Replace Pure loop with standard loop to make things faster
 * @param currentEntity
 * @returns {*}
 */
let sortEntryByKey = (currentEntity) =>
{
    if (Array.isArray(currentEntity))
    {
        for (let i = 0; i < currentEntity.length; ++i)
        {
            const currentArrayEntry = currentEntity[i];
            if (Array.isArray(currentArrayEntry))
            {
                currentEntity[i] = sortEntryByKey(currentArrayEntry);
            }
            else if (currentArrayEntry instanceof Object)
            {
                currentEntity[i] = sortEntryByKey(currentArrayEntry);
            }
        }

        return currentEntity;
    }
    /**
     * According to:
     * @see https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
     * instance Date is not enough
     */
    else if (Object.prototype.toString.call(currentEntity) === "[object Date]")
    {
        return currentEntity;
    }
    if (typeof currentEntity === "function")
    {
        return currentEntity.toString();
    }
    else if (currentEntity instanceof Object)
    {
        currentEntity = Object.keys({...currentEntity}).sort().reduce(
            (obj, key) => {
                obj[key] = currentEntity[key];
                return obj;
            },
            {}
        );

        return currentEntity;
    }

    return currentEntity;
};

/**
 * Compare two variables of any types
 *
 * @param {*} entity1
 * @param {*} entity2
 * @returns {boolean}
 * @author Patrice Thimothee
 */
const varsEqual = (entity1, entity2) =>
{
    if (typeof entity1 !== typeof entity2)
    {
        return false;
    }

    if (Object.prototype.toString.call(entity1) === "[object Symbol]"
        || Object.prototype.toString.call(entity2) === "[object Symbol]")
    {
        return false;
    }

    const sorted1 = sortEntryByKey(entity1);
    const sorted2 = sortEntryByKey(entity2);
    const str1 = JSON.stringify(sorted1);
    const str2 = JSON.stringify(sortEntryByKey(sorted2));
    return str1 === str2;
};

module.exports.varsEqual = varsEqual;
