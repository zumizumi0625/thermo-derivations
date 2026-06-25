---
id: isobaric-isochoric
section: first-law
order: 4
title: 等圧・等積変化の w・q
formula: q = cp ΔT / q = cv ΔT
issue: 462
prereq: [first-law-closed]
---

# 等圧・等積変化の w・q

> **ゴール**: 等積変化で $w=0,\ q=\Delta u=c_v\Delta T$、等圧変化で $q=\Delta h=c_p\Delta T,\ w=p\Delta v=R\Delta T$ を第一法則から導け、両者の熱の差がマイヤーの関係につながることを言える。

## 物理状況

加熱の仕方を2通り固定する。**等積**（体積を固定したフタで加熱）はピストンが動かないので仕事ゼロ、入れた熱は全部内部エネルギーになる。**等圧**（一定圧でピストンが動く）は気体が膨張して仕事をするぶん、同じ $\Delta T$ でも余分に熱が要る。この差が比熱 $c_v$ と $c_p$ の違いを生む。

@@FIG:isobaric-isochoric@@

## 設定

理想気体 $1\,\mathrm{kg}$、状態方程式 [$pv=RT$](#/ideal-gas)。比熱の定義 $c_v=du/dT$、$c_p=dh/dT$。第一法則 $\delta q=du+p\,dv$（または $\delta q=dh-v\,dp$）。状態 $1\to2$ で温度が $\Delta T=T_2-T_1$ 変化する。

## ステップ1: 等積変化（v 一定）の仕事

体積が変わらないので $dv=0$、よって境界仕事は、

$$
w = \int p\,dv = 0
$$

## ステップ2: 等積変化の熱

第一法則 $\delta q=du+p\,dv$ で $p\,dv=0$ より $\delta q=du$。理想気体で $du=c_v\,dT$ だから、

$$
q = \Delta u = \int c_v\,dT = c_v\,\Delta T
$$

## ステップ3: 等圧変化の熱

エンタルピー表示 $\delta q=dh-v\,dp$ を使う。等圧なので $dp=0$、よって $\delta q=dh$。理想気体で $dh=c_p\,dT$ だから、

$$
q = \Delta h = \int c_p\,dT = c_p\,\Delta T
$$

## ステップ4: 等圧変化の仕事

等圧では $p$ が定数なので積分の外に出せる。状態方程式 $pv=RT$ から $p\,\Delta v=R\,\Delta T$ なので、

$$
w = \int p\,dv = p\,\Delta v = p(v_2-v_1) = R\,\Delta T
$$

（検算：$q-w=c_p\Delta T-R\Delta T=(c_p-R)\Delta T=c_v\Delta T=\Delta u$。第一法則と整合し、ここから $c_p-c_v=R$ も読み取れる。）

## 結論

$$
\boxed{\;\text{等積}:\ w=0,\ q=c_v\Delta T\qquad \text{等圧}:\ q=c_p\Delta T,\ w=R\Delta T\;}
$$

> **ポイント**: 「等積の熱は $\Delta u$、等圧の熱は $\Delta h$」と覚えると速い。$\Delta u=c_v\Delta T$ と $\Delta h=c_p\Delta T$ は**理想気体ならどの過程でも**成り立つ（$u,h$ が状態量で $T$ だけの関数だから）——等積・等圧に限った話ではない点に注意。等圧の仕事に対数は出ず $R\Delta T$ で済む。
