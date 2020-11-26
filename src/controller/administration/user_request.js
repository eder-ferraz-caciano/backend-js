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
        request_id: { presence: { allowEmpty: false, numericality: true } },
        user_id: { presence: { allowEmpty: false, numericality: true } }
    };

    //listar telas do usuário
    const onListRequestOfUser = async (req, res) => {

        try {
            await app.db
                .select(
                    "user_request.id",
                    "request_screen.id as requestId",
                    "request_screen.description as description",
                    "request_screen.url as url",
                    "user.id as userId",
                    "user.name as userName",
                    "user.login as userLogin"
                )
                .from("user_request")
                .leftJoin("request_screen", "request_screen.id", "user_request.request_id")
                .leftJoin("user", "user.id", "user_request.user_id")
                .where({
                    "request_screen.deleted_at": null,
                    "user_request.deleted_at": null,
                    "user_request.user_id": req.params.userId
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
            let requestUser = { };
            requestUser.user_id    = req.body.user_id ? Number(req.body.user_id) : undefined;
            requestUser.request_id = req.body.request_id ? Number(req.body.request_id) : undefined;
            hookCreate(requestUser);

            const findUser = await app.db("user")
                .where({
                    deleted_at: null,
                    id: requestUser.user_id
                });

            if (findUser && !findUser.length) return res.json({ erro: "User not found!"});

            const findScreen = await app.db("request_screen")
                .where({
                    deleted_at: null,
                    id: requestUser.request_id
                });

            if (findScreen && !findScreen.length) return res.json({ erro: "Request not found!"});

            const findRelationship = await app.db("user_request")
                .where({
                    deleted_at: null,
                    request_id: requestUser.request_id,
                    user_id: requestUser.user_id
                });

            if (findRelationship && findRelationship.length) {
                return res.json({ erro: "Request already has this user!" });
            }

            const response = await app.db("user_request")
                .insert({
                    ...requestUser
                });

            return res.json({ message: "Request inserted for the user successfull!", screenId: response[0] });
        } catch (error) {
            return res.json({ erro: error });
        }
    };

    const onDelete = async (req, res) => {
        try {
            let userRequest = { id: req.params.id };
            hookDelete(userRequest);

            const findUserRequest = await app.db("user_request")
                .where({
                    deleted_at: null,
                    id: userRequest.id
                });

            if (findUserRequest && !findUserRequest.length) {
                return res.json({ erro: "User Request not found!" });
            }

            await app.db("user_request")
                .where({
                    deleted_at: null,
                    id: userRequest.id
                })
                .update({
                    ...userRequest
                });

            return res.json({ message: "Deleted user request!" });
        } catch (error) {
            return res.json({ erro: error });
        }
    };

    return {
        onDelete,
        onListRequestOfUser,
        onSave
    };
};
