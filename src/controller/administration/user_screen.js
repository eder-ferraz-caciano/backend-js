const validate = require("validate.js");

/**
 * @author Eder Ferraz Caciano
 * @class User Screen
 * @description User Screen Controller Class
 * @param {this} app
 */
module.exports = app => {

    const { hookCreate, hookDelete } = app.src.middleware.knexHook;

    const SaveValidate = {
        screen_id: { presence: { allowEmpty: false, numericality: true } },
        user_id: { presence: { allowEmpty: false, numericality: true } }
    };

    // listar usuários da tela
    const onListScreensOfUser = async (req, res) => {

        try {

            await app.db
                .select(
                    "user_screen.id",
                    "user.id as userId",
                    "screen.name as screenName",
                    "screen.description as screenDescription",
                    "screen.url as routerTo",
                    "screen.icon as icon",
                    "screen.order as order",
                    "screen.icon_color as iconColor"
                )
                .from("user_screen")
                .leftJoin("screen", "screen.id", "user_screen.screen_id")
                .leftJoin("user", "user.id", "user_screen.user_id")
                .where({
                    "screen.deleted_at": null,
                    "user_screen.deleted_at": null,
                    "user_screen.user_id": req.params.userId
                })
                .then (resp => res.json({ registros: resp }))
                .catch( err => res.json({ registros: err }));

        } catch (error) {
            return res.json({ erro: error });
        }
    };

    //listar telas do usuário
    const onListUsersOfScreen = async (req, res) => {

        try {

            await app.db
                .select(
                    "user_screen.id",
                    "screen.id as screenId",
                    "user.id as userId",
                    "user.name as userName",
                    "user.login as userLogin"
                )
                .from("user_screen")
                .leftJoin("screen", "screen.id", "user_screen.screen_id")
                .leftJoin("user", "user.id", "user_screen.user_id")
                .where({
                    "screen.deleted_at": null,
                    "user_screen.deleted_at": null,
                    "user_screen.screen_id": req.params.screenId,
                })
                .then (resp => res.json({ registros: resp }))
                .catch( err => res.json({ registros: err }));
        
        } catch (error) {

            return res.json({ erro: error });

        }

    };

    const onSave = async (req, res) => {

        let erro = validate(req.body, SaveValidate);
        if (erro) return res.json({ erro: erro });

        try {

            let screenUser = { };
            screenUser.user_id   = req.body.user_id ? Number(req.body.user_id) : undefined;
            screenUser.screen_id = req.body.screen_id ? Number(req.body.screen_id) : undefined;
            hookCreate(screenUser);

            const findUser = await app.db("user")
                .where({
                    deleted_at: null,
                    id: screenUser.user_id
                });
            if (findUser && !findUser.length) return res.json({ erro: "User not found!"});

            const findScreen = await app.db("screen")
                .where({
                    deleted_at: null,
                    id: screenUser.screen_id
                });
            if (findScreen && !findScreen.length) return res.json({ erro: "Screen not found!"});

            const findRelationship = await app.db("user_screen")
                .where({
                    deleted_at: null,
                    screen_id: screenUser.screen_id,
                    user_id: screenUser.user_id
                });

            if (findRelationship && findRelationship.length) {

                return res.json({ erro: "User already has this screen!" });

            }

            const response = await app.db("user_screen")
                .insert({
                    ...screenUser
                });

            return res.json({ message: "Screen inserted for the user successfull!", screenId: response[0] });
        
        } catch (error) {

            return res.json({ erro: error });

        }

    };

    const onDelete = async (req, res) => {

        try {

            let userScreen = { id: req.params.id };
            hookDelete(userScreen);

            const findUserScreen = await app.db("user_screen")
                .where({
                    deleted_at: null,
                    id: userScreen.id
                });
            if (findUserScreen && !findUserScreen.length) {

                return res.json({ erro: "User Screen not found!" });

            }

            await app.db("user_screen")
                .where({
                    deleted_at: null,
                    id: userScreen.id
                })
                .update({
                    ...userScreen
                });

            return res.json({ message: "Deleted user screen!" });

        } catch (error) {

            return res.json({ erro: error });

        }

    };

    return {
        onDelete,
        onListScreensOfUser,
        onListUsersOfScreen,
        onSave
    };
};
