import React, { useEffect, useMemo, useRef, useState } from "react";
import { City, Country, ICountry, IState, State } from "country-state-city";
import { Controller } from "react-hook-form";
import { Building2, Globe } from "lucide-react";
import { FormField } from "@/components/common/FormFields";
import { LocationSelect } from "@/components/dashboards/createEventDashboard/views/addressForm/LocationSelect";
import { Input } from "@/components/ui";

export const AddressForm = ({ form }) => {
  const {
    register,
    formState: { errors },
    watch,
    control,
    setValue: setLocaleValue
  } = form;
  const countryRef = useRef(null) as any;
  const watchCountryCode = watch("eventLocation.countryCode");
  const watchStateCode = watch("eventLocation.stateCode");

  const [stateIsRequired, setStateIsRequired] = useState(true);

  const countries = useMemo(() => Country.getAllCountries(), []);
  const states = useMemo(
    () =>
      !!watchCountryCode ? State.getStatesOfCountry(watchCountryCode) : [],
    [watchCountryCode]
  );
  const cities = useMemo(() => {
    if (!!watchCountryCode && !states.length) {
      return City.getCitiesOfCountry(watchCountryCode) || [];
    } else {
      return !!watchStateCode
        ? City.getCitiesOfState(watchCountryCode, watchStateCode)
        : [{ name: "City", isoCode: "city" }];
    }
  }, [watchCountryCode, watchStateCode]);

  const countriesOptions = countries.map((item: ICountry) =>
    countryFormatDataToOption(item)
  );
  const statesOptions = states.map((item: IState) => ({
    label: item.name,
    value: item.isoCode
  }));
  const citiesOptions = cities.map((item) => ({
    label: item.name,
    value: item.name.toLowerCase(),
    cityLatitude: item.latitude,
    cityLongitude: item.longitude
  }));

  const onCountryValueChange = (option, field) => {
    field.onChange(option.label);
    setLocaleValue("eventLocation.countryCode", option.value);
    setLocaleValue("eventLocation.city", "");
    setLocaleValue("eventLocation.stateCode", "");
    setLocaleValue("eventLocation.continent", option.continent);
    setLocaleValue(
      "eventLocation.countryLatitude",
      option.countryLatitude
    );
    setLocaleValue(
      "eventLocation.countryLongitude",
      option.countryLongitude
    );
    setLocaleValue("eventLocation.countryFlag", option.countryFlag);

  };
  const onStateValueChange = (option, field) => {
    field.onChange(option.value);
    setLocaleValue("eventLocation.city", "");
  };
  const onCityValueChange = (option, field) => {
    field.onChange(option.label);
    setLocaleValue("eventLocation.cityLatitude", option.cityLatitude);
    setLocaleValue("eventLocation.cityLongitude", option.cityLongitude);

  };

  const locationWithoutStatesAndCities =
    (!!watchCountryCode && !states.length && !citiesOptions.length) ||
    (!!watchCountryCode && !!states.length && !citiesOptions.length);

  useEffect(() => {
    if (locationWithoutStatesAndCities && stateIsRequired) {
      setStateIsRequired(false);
    } else if (!stateIsRequired && !locationWithoutStatesAndCities) {
      setStateIsRequired(true);
    }
  }, [locationWithoutStatesAndCities]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4" ref={countryRef}>
        <FormField
          label={"Country*"}
          isInvalid={!!errors?.country}
          errorMessage={errors?.country?.message}
        >
          <Controller
            render={({ field }) => {
              const currentValue = countriesOptions?.find(i => i.label === field?.value);
              return (
                <LocationSelect
                  options={countriesOptions}
                  placeholder={"Country"}
                  icon={<Globe size={20} />}
                  onChange={(e) => {
                    onCountryValueChange(e, field);
                  }}
                  isDisabled={false}
                  value={currentValue}
                />
              );
            }}
            name={"eventLocation.country"}
            control={control}
          />
        </FormField>
        <FormField
          label={`State${stateIsRequired ? "*" : ""}`}
          isInvalid={!!errors?.stateCode}
          isDisabled={!watchCountryCode}
          errorMessage={errors?.stateCode?.message}
        >
          <Controller
            render={({ field }) => {
              const currentValue = statesOptions?.find(i => i.value === field?.value);
              return (
                <LocationSelect
                  options={statesOptions}
                  placeholder={"State"}
                  icon={<Building2 size={20} />}
                  onChange={(e) => {
                    onStateValueChange(e, field);
                  }}
                  isDisabled={!watchCountryCode}
                  value={currentValue}
                />
              );
            }}
            name={"eventLocation.stateCode"}
            control={control}
          />
        </FormField>
      </div>

      <FormField
        label={"City*"}
        isInvalid={!!errors?.city}
        isDisabled={
          !watchCountryCode || (!watchStateCode && !!states.length)
        }
        errorMessage={errors?.city?.message}
      >
        {locationWithoutStatesAndCities ? (
          <div className="flex gap-1 items-center relative">
            <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input id={"eventLocation.city"} placeholder={"City"} {...register("eventLocation.city")} className={`pl-10`} />
          </div>
        ) : (
          <Controller
            render={({ field }) => {
              const currentValue = citiesOptions?.find(i => i.label === field?.value);
              return (
                <LocationSelect
                  options={citiesOptions}
                  placeholder={"City"}
                  icon={<Building2 size={20} />}
                  onChange={(e) => {
                    onCityValueChange(e, field);
                  }}
                  isDisabled={
                    !watchCountryCode ||
                    (!watchStateCode && !!states.length)
                  }
                  value={currentValue}
                />
              );
            }}
            name={"eventLocation.city"}
            control={control}
          />
        )}
      </FormField>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Street 1nd line" id="eventLocation.street1stLine" register={register} placeholder="Address details" />
        <FormField label="Street 2nd line" id="eventLocation.street2ndLine" placeholder="Enter additional address details" register={register} />
      </div>
      <FormField label="Postal Code" id="eventLocation.postalCode" placeholder="Postal Code e.g., 123321" register={register} errorMessage={errors?.postalCode?.message} isInvalid={!!errors?.postalCode} />
      <FormField label="Location details (optional)" id="eventLocation.locationDetails" placeholder="Location details e.g., Conference House" register={register} errorMessage={errors?.postalCode?.message} />
    </div>
  );
};

const countryFormatDataToOption = (country: ICountry) => {
  return {
    label: country.name,
    value: country.isoCode,
    flag: country.flag,
    continent: country.timezones?.[0]?.zoneName?.split("/")?.[0] || "Others",
    countryFlag: country.flag,
    countryLatitude: country.latitude,
    countryLongitude: country.longitude
  };
};