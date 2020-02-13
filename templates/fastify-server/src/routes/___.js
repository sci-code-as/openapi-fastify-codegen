import {{camelCase operation_name}} from '../services/{{operation_name}}';

export default async function (fastify, opts) {
  {{#each headOperation}}
  {{#each this.path}}
  {{#validMethod @key}}
  /**
   {{#each this.descriptionLines}}
   * {{{this}}}
   {{/each}}
   */
  fastify.{{@key}}('{{../subresource}}', async (req, reply) => {
    const options = {
    {{#if this.requestBody}}
    body: req.body{{#compare (lookup this.parameters 'length') 0 operator = '>' }},{{/compare}}
      {{/if}}
        {{#each this.parameters}}
        {{#equal this.in "query"}}
        {{{quote this.name}}}: req.query['{{this.name}}']{{#unless @last}},{{/unless}}
          {{/equal}}
            {{#equal this.in "path"}}
            {{{quote this.name}}}: req.params['{{this.name}}']{{#unless @last}},{{/unless}}
              {{/equal}}
                {{#equal this.in "header"}}
                {{{quote this.name}}}: req.header['{{this.name}}']{{#unless @last}},{{/unless}}
                  {{/equal}}
                    {{/each}}
    };

                      try {
                        const result = await {{camelCase ../../operation_name}}.{{this.operationId}}(options);
                        {{#ifNoSuccessResponses this.responses}}
                        reply.header('X-Result', result.data).code(200).send();
                        {{else}}
                        reply.code(result.status || 200).send(result.data);
                        {{/ifNoSuccessResponses}}
                        } catch (err) {
                          {{#ifNoErrorResponses this.responses}}
                          return reply.code(500).send({
                            status: 500,
                            error: 'Server Error'
                          });
                          {{else}}
                          next(err);
                          {{/ifNoErrorResponses}}
                          }
                          });
  {{/validMethod}}
  {{/each}}
  {{/each}}

        {{#each operation}}
        {{#each this.path}}
        {{#validMethod @key}}
        /**
         {{#each this.descriptionLines}}
         * {{{this}}}
         {{/each}}
         */
        fastify.{{@key}}('{{../subresource}}', async (req, res) => {
          const options = {
          {{#if this.requestBody}}
          body: req.body{{#compare (lookup this.parameters 'length') 0 operator = '>' }},{{/compare}}
            {{/if}}
              {{#each this.parameters}}
              {{#equal this.in "query"}}
              {{{quote this.name}}}: req.query['{{this.name}}']{{#unless @last}},{{/unless}}
                {{/equal}}
                  {{#equal this.in "path"}}
                  {{{quote this.name}}}: req.params['{{this.name}}']{{#unless @last}},{{/unless}}
                    {{/equal}}
                      {{#equal this.in "header"}}
                      {{{quote this.name}}}: req.header['{{this.name}}']{{#unless @last}},{{/unless}}
                        {{/equal}}
                          {{#match @../key "(post|put)"}}
                            {{#equal ../in "body"}}
                              {{{quote this.name}}}: req.body['{{this.name}}']{{#unless @last}},{{/unless}}
                                {{/equal}}
                                  {{/match}}
                                    {{/each}}
                                    };

                                      try {
                                        const result = await {{camelCase ../../operation_name}}.{{this.operationId}}(options);
                                        {{#ifNoSuccessResponses this.responses}}
                                        reply.code(200).send(result.data);
                                        {{else}}
                                        reply.code(result.status || 200).send(result.data);
                                        {{/ifNoSuccessResponses}}
                                        } catch (err) {
                                          {{#ifNoErrorResponses this.responses}}
                                          return reply.code(500).send({
                                            status: 500,
                                            error: 'Server Error'
                                          });
                                          {{else}}
                                          next(err);
                                          {{/ifNoErrorResponses}}
                                          }
                                          });

        {{/validMethod}}
          {{/each}}
        {{/each}}

};
