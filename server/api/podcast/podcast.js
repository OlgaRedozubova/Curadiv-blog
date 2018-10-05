const logger = require('heroku-logger');
const db_model = require('../../models/db_models');
const Podcast = require('../../models/podcast');


const something_wrong = (req, e) => {
    logger.error(`path:'${req.path}' api:user | Error: ` + e);
    return req.res.status(500).send({message: 'Something went wrong', message_code: '500', error: `${e}`}); //e.stack
};

module.exports = {
    show: (db) => async (req, res) => {
        try {
            const podcast_id = req.params.id;
            if (!podcast_id) {
                res.status(404).send({message: 'Podcast not found'})
            } else {
                const db_Podcast = db_model(Podcast, db);
                const podcast = await db_Podcast.findById(podcast_id);
                if (!podcast) {
                    const msg = `Podcast with id: '${podcast_id}' not found`;
                    logger.warn(msg);
                    res.status(404).send({message: msg})
                } else {
                    logger.info(`podcast:show: (${JSON.stringify(podcast)})`);
                    res.status(200).json(podcast);
                }
            }

        } catch (e) {
            something_wrong(req, e);
        }
    }
};