---
id: specific-heat
section: foundation
order: 2
title: 比熱 cv・cp の定義
formula: cv = (∂u/∂T)_v,  cp = (∂h/∂T)_p
issue: 456
prereq: [ideal-gas]
---

# 比熱 cv・cp の定義

> **ゴール**: 「定積比熱は内部エネルギーの、定圧比熱はエンタルピーの温度微分」を第一法則から導け、理想気体ではどちらも $T$ だけの関数になる理由を言える。

## 物理状況

比熱とは「$1\,\mathrm{kg}$ を $1\,\mathrm{K}$ 上げるのに要する熱量」。ところが熱 $q$ は経路に依存するので、**どう加熱するか**で値が変わる。代表が**定積**（体積を固定）と**定圧**（圧力を固定）の2通り。

@@FIG:cv-cp-pistons@@

## 設定

閉じた系 $1\,\mathrm{kg}$。第一法則の微小形 $\delta q = du + p\,dv$、エンタルピー $h=u+pv$。比熱は $c \equiv \delta q/dT$ だが、加熱条件を添字で固定する。

## ステップ1: 定積（$v=$ const）→ cv

体積を固定すると $dv=0$ なので膨張仕事が消え、$\delta q = du$。よって

$$
c_v \equiv \left(\frac{\delta q}{dT}\right)_v = \left(\frac{\partial u}{\partial T}\right)_v
$$

## ステップ2: 定圧（$p=$ const）→ cp

エンタルピーの微分 $dh = du + p\,dv + v\,dp$ を使う。第一法則 $\delta q = du+p\,dv$ と並べると $\delta q = dh - v\,dp$。圧力一定で $dp=0$ なので $\delta q = dh$。よって

$$
c_p \equiv \left(\frac{\delta q}{dT}\right)_p = \left(\frac{\partial h}{\partial T}\right)_p
$$

## ステップ3: 理想気体では $u,h$ は $T$ だけの関数

ジュールの実験（理想気体の自由膨張で温度不変）から $u=u(T)$。すると $h=u+pv=u(T)+RT$ も $T$ だけの関数。したがって偏微分は常微分になり、

$$
c_v = \frac{du}{dT},\qquad c_p = \frac{dh}{dT}
$$

## 結論

$$
\boxed{\,c_v = \left(\frac{\partial u}{\partial T}\right)_v,\qquad c_p = \left(\frac{\partial h}{\partial T}\right)_p\,}
$$

理想気体なら $du = c_v\,dT$、$dh = c_p\,dT$（過程によらず常に成立）。

> **ポイント**: $du=c_v dT$ は**定積に限らず**理想気体ならどの過程でも使える（$u$ が $T$ だけの関数だから）。ここを「定積のときだけ」と誤解すると断熱・等温の計算で詰まる。
