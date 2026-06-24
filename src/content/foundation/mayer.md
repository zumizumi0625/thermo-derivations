---
id: mayer
section: foundation
order: 3
title: マイヤーの関係
formula: cp − cv = R
issue: 457
year: 2024
prereq: [ideal-gas, specific-heat]
---

# マイヤーの関係

> **ゴール**: $c_p-c_v=R$ を $h=u+pv$ と理想気体の状態方程式だけから導け、「差 $R$ は定圧加熱で気体がする膨張仕事」と物理的に説明できる。

## 物理状況

定圧加熱では気体が膨張して外へ仕事をする分、同じ $\Delta T$ でも定積より余分に熱が要る。だから必ず $c_p>c_v$。その差がちょうど比気体定数 $R$ になる、というのがマイヤーの関係。

@@FIG:mayer-pdv@@

## 設定

理想気体 $1\,\mathrm{kg}$。$c_v=\dfrac{du}{dT}$、$c_p=\dfrac{dh}{dT}$（[比熱の定義](#/specific-heat)より）、状態方程式 $pv=RT$。

## ステップ1: エンタルピーを展開

定義 $h=u+pv$ に理想気体の $pv=RT$ を代入：

$$
h = u + RT
$$

## ステップ2: 温度で微分

両辺を $T$ で微分する。$u,h$ は $T$ だけの関数なので常微分：

$$
\frac{dh}{dT} = \frac{du}{dT} + R
$$

## ステップ3: 比熱で書き換える

$\dfrac{dh}{dT}=c_p$、$\dfrac{du}{dT}=c_v$ を入れると、

$$
c_p = c_v + R
$$

## 結論

$$
\boxed{\,c_p - c_v = R\,}
$$

比熱比 $\kappa=c_p/c_v$ と連立すると $c_v=\dfrac{R}{\kappa-1}$、$c_p=\dfrac{\kappa R}{\kappa-1}$ と即座に出せて便利。

> **ポイント**: 差 $R$ の正体は「定圧で $1\,\mathrm{K}$ 上げたとき気体がする仕事 $p\,dv=R\,dT$」。理想気体専用の関係（実在気体では成り立たない）。
