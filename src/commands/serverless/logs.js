const { TwilioClientCommand } = require("@twilio/cli-core").baseCommands;

const { handler, cliInfo, describe } = require("twilio-run/dist/commands/logs");

const {
  convertYargsOptionsToOclifFlags,
  normalizeFlags,
  createExternalCliOptions,
} = require("../../utils");

class LogsList extends TwilioClientCommand {
  async run() {
    await super.run();

    let { flags, args } = this.parse(LogsList);
    flags = normalizeFlags(flags);

    const externalOptions = createExternalCliOptions(flags, this.twilioClient);

    const { edge, region } = getRegionAndEdge(flags, this);
    flags.region = region;
    flags.edge = edge;

    const opts = Object.assign({}, flags, args);
    return handler(opts, externalOptions);
  }
}

LogsList.description = describe;

LogsList.args = [];

LogsList.flags = Object.assign(
  convertYargsOptionsToOclifFlags(cliInfo.options),
  { profile: TwilioClientCommand.flags.profile }
);

module.exports = LogsList;
