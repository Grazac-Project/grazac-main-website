// @ts-nocheck
import { handleBlur, inputChangeHandler } from "../handler";
import Input from "./Input";

const SpaceForm = ({ team, setTeam, formValid, data }) => {
  const formArr = [];

  for (let key in team) {
    formArr.push({
      key,
      config: team[key],
    });
  }

  const form = formArr.map(({ config, key }) => (
    <Input
      key={key}
      type={config.type}
      label={config.label}
      onchange={(event) =>
        inputChangeHandler(event, key, team, setTeam, formValid, data)
      }
      onblur={() => handleBlur(key, team, setTeam)}
      blur={config.blur}
      isValid={config.isValid}
      required={config.require}
    />
  ));
  return <>{form}</>;
};

export default SpaceForm;
