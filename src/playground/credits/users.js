const shuffle = list => {
    for (let i = list.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        const tmp = list[i];
        list[i] = list[random];
        list[random] = tmp;
    }
    return list;
};

const fromHardcoded = ({ userId, username, name }) => ({
    image: `https://trampoline.turbowarp.org/avatars/${userId}`,
    href: `https://scratch.mit.edu/users/${username}/`,
    text: name || username
});

const fromHardcodedGithub = username => ({
    image: `https://github.com/${username}.png`,
    href: `https://github.com/${username}/`,
    text: username
});
const fromHardcodedNamed = username => ({
    image: `https://penguinmod.com/unknown_user.png`,
    href: "https://studio.penguinmod.com/credits.html#",
    text: username
});

const addonDevelopers = [
    {
        userId: '34018398',
        username: 'Jeffalo'
    },
    {
        userId: '64184234',
        username: 'ErrorGamer2000'
    },
    {
        userId: '41616512',
        username: 'pufferfish101007'
    },
    {
        userId: '61409215',
        username: 'TheColaber'
    },
    {
        userId: '1882674',
        username: 'griffpatch'
    },
    {
        userId: '10817178',
        username: 'apple502j'
    },
    {
        userId: '16947341',
        username: '--Explosion--'
    },
    {
        userId: '14880401',
        username: 'Sheep_maker'
    },
    {
        userId: '9981676',
        username: 'NitroCipher'
    },
    {
        userId: '2561680',
        username: 'lisa_wolfgang'
    },
    {
        userId: '60000111',
        username: 'GDUcrash'
    },
    {
        userId: '4648559',
        username: 'World_Languages'
    },
    {
        userId: '17340565',
        username: 'GarboMuffin'
    },
    {
        userId: '5354974',
        username: 'Chrome_Cat'
    },
    {
        // actual ID is 34455896 but their avatar is the wrong resolution and looks really weird
        userId: '0',
        username: 'summerscar'
    },
    {
        userId: '55742784',
        username: 'RedGuy7'
    },
    {
        userId: '9636514',
        username: 'Tacodiva7729'
    },
    {
        userId: '14792872',
        username: '_nix'
    },
    {
        userId: '30323614',
        username: 'BarelySmooth'
    },
    {
        userId: '64691048',
        username: 'CST1229'
    },
    {
        userId: '12498592',
        username: 'LilyMakesThings'
    }
].map(fromHardcoded);

const pmDevelopers = [
    'Cooldevv1'
].map(fromHardcodedGithub);

const pmPullRequestDevelopers = [ // these people made a PR that got merged, or got a dev to add something they made
    {
        text: 'NexusKitten',
        image: `https://github.com/NexusKitten.png`,
        href: `https://github.com/NexusKitten/`,
    },
    {
        text: 'LilyMakesThings',
        image: `https://github.com/LilyMakesThings.png`,
        href: `https://github.com/LilyMakesThings/`,
    },
    {
        text: 'MikeDev101',
        image: `https://github.com/MikeDev101.png`,
        href: `https://github.com/MikeDev101/`,
    },
    {
        text: 'kokofixcomputers',
        image: `https://github.com/kokofixcomputers.png`,
        href: `https://github.com/kokofixcomputers/`,
    },
    {
        text: 'PPPDUD',
        image: `https://github.com/PPPDUD.png`,
        href: `https://github.com/PPPDUD/`,
    },
    {
        text: 'qbjl',
        image: `https://github.com/qbjl.png`,
        href: `https://github.com/qbjl/`,
    },
    {
        text: 'minidogg',
        image: `https://github.com/minidogg.png`,
        href: `https://github.com/minidogg/`,
    },
    {
        text: 'concertalyis',
        image: `https://github.com/concertalyis.png`,
        href: `https://github.com/concertalyis/`,
    },
    {
        text: 'Steve0Greatness',
        image: `https://github.com/Steve0Greatness.png`,
        href: `https://github.com/Steve0Greatness/`,
    },
    {
        text: 'ilikecoding-197',
        image: `https://github.com/ilikecoding-197.png`,
        href: `https://github.com/ilikecoding-197/`,
    },
    {
        text: 'NotEmbin',
        image: `https://github.com/NotEmbin.png`,
        href: `https://github.com/NotEmbin/`,
    },
    {  // rx or ry single fix
        text: 'NotCryptid',
        image: `https://penguinmod.com/unknown_user.png`,
        href: `https://github.com/NotCryptid/`,
    },
    {
        text: 'DogeisCut',
        image: `https://github.com/DogeisCut.png`,
        href: `https://github.com/Dogeiscut/`,
    },
    // list could be missing some people, but theres not really a way to tell
];

const pmApiDevelopers = [
    'Cooldevv1',
].map(fromHardcodedGithub);

const pmTranslators = [];

const pmCostumeSubmittors = [];
const pmSoundSubmittors = [];

const extensionDevelopers = [
    'GarboMuffin',
    'griffpatch',
    'DT-is-not-available',
    'Xeltalliv',
    'MikeDev101',
    'LilyMakesThings'
].map(fromHardcodedGithub);
const pmExtensionDevelopers = [
    'qbjl',
    'NexusKitten',
    'Gen1x-ALT',
    'SharkPool-SP',
    'DogeisCut', // listed as a collaborator on a SharkPool extension
    'David-Orangemoon',
    'pooiod',
    'WAYLIVES',
    'MrRedstonia',
    'MikeDev101',
    'liablelua',
    'AlexSchoolOH',
    'Monochromasity',
    'LilyMakesThings',
    'TheShovel',
    'skyhigh173',
    'Ruby-Devs',
    'oc9x97',
    'lego7set',
    'mariocraft987',
    'AshimeeAlt'
].map(fromHardcodedGithub);

export default {
    addonDevelopers: shuffle(addonDevelopers),
    pmDevelopers: shuffle(pmDevelopers),
    extensionDevelopers: shuffle(extensionDevelopers),
    pmExtensionDevelopers: shuffle(pmExtensionDevelopers),
    pmApiDevelopers: shuffle(pmApiDevelopers),
    pmTranslators: shuffle(pmTranslators),
    pmSoundSubmittors: shuffle(pmSoundSubmittors),
    pmCostumeSubmittors: shuffle(pmCostumeSubmittors),
    pmPullRequestDevelopers: shuffle(pmPullRequestDevelopers)
};
