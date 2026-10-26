import { type Meta } from "@storybook/react"
import { useState } from "react"
import { Plus, User, UserLock, Workspace } from "../Icon"
import { type Option, Select, type SelectProps } from "./"

const meta = {
  title: "Components/Select",
  component: Select,
  args: {
    disabled: false,
    loading: false,
    pill: false,
    clearable: false,
    block: true,
    multiple: true,
  },
  argTypes: {
    listMinWidth: {
      control: {
        type: "range",
        min: 100,
        max: 400,
        step: 5,
      },
    },
    listWidth: {
      control: {
        type: "range",
        min: 100,
        max: 400,
        step: 5,
      },
    },
    alignOffset: {
      control: {
        type: "range",
        min: 0,
        max: 40,
        step: 1,
      },
    },
    value: { control: false },
    // Undesirable for the controllable examples
    multiple: { control: false },
    options: { control: false },
    onChange: { control: false },
    actions: { control: false },
    searchEmptyMessage: { control: false },
    searchPredicate: { control: false },
    triggerClassName: { control: false },
    TriggerView: { control: false },
    OptionView: { control: false },
    // No one should customize this
    avoidCollisions: { table: { disable: true } },
  },
} satisfies Meta<typeof Select>

export default meta

export const Base = (
  args: Omit<SelectProps<Option>, "multiple" | "value" | "onChange" | "TriggerView">,
) => {
  const [fruit, setFruit] = useState<string>("")

  return (
    <div style={{ width: 200 }}>
      <Select
        placeholder="Select a fruit..."
        {...args}
        multiple={false}
        value={fruit}
        options={fruitsOptions}
        name="fruits"
        onChange={(params) => {
          setFruit(params.value)
        }}
      />
    </div>
  )
}

Base.parameters = {
  docs: {
    source: {
      code: `
<Select
  value={fruit}
  options={fruits}
  onChange={handleChange}
  placeholder="Select a fruit..."
  variant="solid"
/>
  `,
    },
  },
}

export const Actions = () => {
  const [value, setValue] = useState<string>(() => "")

  return (
    <div style={{ width: 150 }}>
      <Select
        variant="soft"
        value={value}
        block
        options={items}
        placeholder="Select..."
        align="start"
        listMinWidth={240}
        onChange={(v) => setValue(v.value)}
        triggerClassName="font-semibold"
        actions={[
          {
            id: "create",
            label: "Create project",
            Icon: Plus,
            onSelect: () => {},
          },
          {
            id: "overview",
            label: "Organization overview",
            Icon: Workspace,
            onSelect: () => {},
          },
        ]}
      />
    </div>
  )
}

Actions.parameters = {
  docs: {
    source: {
      code: `
<Select
  value={value}
  onChange={handleChange}
  options={items}
  placeholder="Select..."
  align="start"
  listMinWidth={240}
  triggerClassName="font-semibold"
  actions={[
    {
      id: "create",
      label: "Create project",
      Icon: Plus,
      onSelect: () => {},
    },
    {
      id: "overview",
      label: "Organization overview",
      Icon: Workspace,
      onSelect: () => {},
    },
  ]}
/>`,
    },
  },
}

export const CustomViews = () => {
  const [role, setRole] = useState<string>("reader")

  return (
    <div style={{ width: 200 }}>
      <Select
        value={role}
        options={roles}
        placeholder="Select role..."
        align="start"
        listMinWidth={260}
        variant="ghost"
        size="lg"
        onChange={({ value }) => setRole(value)}
        TriggerStartIcon={role === "owner" ? UserLock : User}
        triggerClassName="font-semibold"
        optionClassName="font-semibold"
      />
    </div>
  )
}

CustomViews.parameters = {
  docs: {
    source: {
      code: `
const RoleOptionDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="font-normal text-secondary py-px text-[0.935em] leading-[1.45]">
    {children}
  </div>
);

const roles: Role[] = [
  {
    value: "owner",
    label: "Owner",
    description: (
      <RoleOptionDescription>
        Can modify project information and manage project members
      </RoleOptionDescription>
    ),
  },
  {
    value: "reader",
    label: "Reader",
    description: (
      <RoleOptionDescription>
        Can make API requests that read or modify data
      </RoleOptionDescription>
    ),
  },
];

const CustomSelect = () => (
  <Select
    value={role}
    options={roles}
    placeholder="Select role..."
    align="start"
    listMinWidth={260}
    variant="ghost"
    size="lg"
    onChange={({ value }) => setRole(value)}
    TriggerStartIcon={role === "owner" ? UserLock : User}
    triggerClassName="font-semibold"
    optionClassName="font-semibold"
  />
)
`,
    },
  },
}

export const GroupedOptions = () => {
  const [valueFour, setValueFour] = useState<string>(() => items[0].value)
  return (
    <div style={{ width: 200 }}>
      <Select
        variant="outline"
        value={valueFour}
        side="bottom"
        size="lg"
        options={groupedItems}
        listMinWidth={300}
        searchPlaceholder="Select a model..."
        clearable
        onChange={(v) => {
          const val = v.value
          if (!val) {
            setValueFour(val)
          } else {
            setValueFour(val)
          }
        }}
      />
    </div>
  )
}

GroupedOptions.parameters = {
  docs: {
    source: {
      code: `
const groupedItems = [
  {
    label: "Datasets",
    options: [
      ...
    ],
    // Custom limits
    optionsLimit: {
      limit: 7,
      label: "Show all datasets",
    },
  },
  {
    label: "Saved views",
    options: [
      ...
    ],
    // Default
    optionsLimit: {
      limit: 100,
      label: "Show all",
    },
  },
];

const GroupedOptions = () => {
  const [value, setValue] = useState<string>("");

  return (
    <Select
      value={value}
      options={groupedItems}
      onChange={(v) => setValue(v.value)}
      variant="outline"
      size="lg"
      side="bottom"
      listMinWidth={300}
      searchPlaceholder="Select a model..."
      clearable
    />
  );
};`,
    },
  },
}

const MultiFruitTriggerView = ({
  values,
  selectedAll,
}: {
  values: { label: string }[]
  selectedAll: boolean
}) => {
  const displayValue = selectedAll
    ? "All fruits"
    : values.length === 1
      ? values[0].label
      : `${values.length} fruits`

  return <>{displayValue}</>
}

export const MultiSelect = () => {
  const [fruits, setFruits] = useState<string[]>([])

  return (
    <div style={{ width: 200 }}>
      <Select
        variant="soft"
        placeholder="Select fruits..."
        options={fruitsOptions}
        name="fruits"
        multiple
        clearable
        value={fruits}
        onChange={(values) => {
          setFruits(values.map(({ value }) => value))
        }}
        TriggerView={MultiFruitTriggerView}
      />
    </div>
  )
}

MultiSelect.parameters = {
  docs: {
    source: {
      code: `
const MultiFruitTriggerView = ({
  values,
  selectedAll,
}: {
  values: { label: string }[];
  selectedAll: boolean;
}) => {
  const displayValue = selectedAll
    ? "All fruits"
    : values.length === 1
    ? values[0].label
    : \`\${values.length} fruits\`;

  return <>{displayValue}</>;
};

const MultiFruitSelect = () => {
  const [fruits, setFruits] = useState<string[]>([]);

  return (
    <Select
      variant="solid"
      placeholder="Select fruits..."
      options={fruitsOptions}
      name="fruits"
      multiple
      clearable
      value={fruits}
      onChange={(values) => {
          setFruits(values.map(({ value }) => value));
      }}
      TriggerView={MultiFruitTriggerView}
    />
  );
};`,
    },
  },
}

const fruitsOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Mango", value: "mango" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Watermelon", value: "watermelon" },
]

const items = [
  { label: "List item 1", value: "1" },
  { label: "List item 2", value: "2" },
  { label: "List item 3", value: "3", disabled: true },
  { label: "List item 4", value: "4" },
  { label: "List item 5", value: "5" },
  { label: "List item 6", value: "6" },
  { label: "List item 7", value: "7" },
  { label: "List item 8", value: "8" },
]

const groupedItems = [
  {
    label: "Datasets",
    options: [
      {
        label: "revenue-daily",
        value: "1",
        tooltip: {
          content: "Daily revenue rollup across every region and channel",
          maxWidth: 248,
        },
      },
      {
        label: "revenue-weekly",
        value: "1o",
        tooltip: {
          content: "Weekly revenue summary that loads quickly for lightweight checks",
          maxWidth: 248,
        },
      },
      { label: "orders", value: "2" },
      { label: "customers", value: "3" },
      { label: "inventory", value: "4" },
      { label: "sessions", value: "5" },
      { label: "refunds", value: "6" },
      { label: "churn", value: "7" },
      // More
      { label: "events-a", value: "4a" },
      { label: "events-b", value: "4b" },
      { label: "events-c", value: "4c" },
      { label: "events-d", value: "4d" },
      { label: "events-e", value: "4e" },
      { label: "events-f", value: "4f" },
      { label: "events-g", value: "4g" },
      { label: "events-h", value: "4h" },
      { label: "events-omega", value: "4omega" },
      { label: "events-ultra", value: "4ultra" },
    ],
    optionsLimit: {
      limit: 7,
      label: "Show all datasets",
    },
  },
  {
    label: "Saved views",
    options: [
      { label: "view:revenue-daily:team::8nu8CTNj", value: "ft1" },
      { label: "view:revenue-daily:team::8oz5FXdb", value: "ft2" },
      { label: "view:revenue-daily:team::8ozVmSUp", value: "ft3" },
      { label: "view:revenue-daily:team::8pMlpiKm", value: "ft4" },
      { label: "view:revenue-weekly:team", value: "ft5" },
    ],
    // Implied default
    optionsLimit: {
      limit: 100,
      label: "Show all",
    },
  },
]

const RoleOptionDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="font-normal text-secondary py-px text-[0.935em] leading-[1.45]">{children}</div>
)

type Role = {
  value: string
  label: string
  description: React.ReactNode
}

const roles: Role[] = [
  {
    value: "owner",
    label: "Owner",
    description: (
      <RoleOptionDescription>
        Can modify project information and manage project members
      </RoleOptionDescription>
    ),
  },
  {
    value: "reader",
    label: "Reader",
    description: (
      <RoleOptionDescription>Can make API requests that read or modify data</RoleOptionDescription>
    ),
  },
]
