# distance 8-ch filter filter

Set the distance filter (E1): off, median of the last 3 (default) or 5 readings. RAM only.

```sig
mbc.tof8SetFilter(filter)
```

## Parameters

* **filter**: filter

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    mbc.tof8SetFilter(MbcTofFilter.Off)
})
```

## See also

[Ranger 8-way](https://mbc-pro-sensors.github.io/en/sensors/tof8/microbit/makecode.html), [all blocks](https://github.com/contactmbcrobot/pxt-mbc-sensors#readme)

```package
mbc-sensors=github:contactmbcrobot/pxt-mbc-sensors
```
