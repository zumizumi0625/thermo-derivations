---
id: kappa-equipartition
section: foundation
order: 4
title: 比熱比κとエネルギー等分配則
formula: cv = (f/2)R,  κ = (f+2)/f
issue: 458
year: 2024,2023
prereq: [mayer]
---

# 比熱比κとエネルギー等分配則

> **ゴール**: エネルギー等分配則から自由度 $f$ ごとの $c_v$ を出し、単原子 $\kappa=5/3$・2原子 $\kappa=7/5$ を根拠つきで言える。

## 物理状況

気体分子のもつエネルギーは「運動の自由度」に分かれて蓄えられる。**等分配則**は「1自由度あたり平均 $\tfrac12 k_BT$（1 molなら $\tfrac12\bar R T$）が等しく配られる」という統計力学の結果。自由度の数 $f$ が決まれば $c_v$、ひいては比熱比 $\kappa$ が決まる。

@@FIG:dof-molecules@@

## 設定

理想気体 $1\,\mathrm{mol}$。並進3＋（分子形状による）回転・振動の自由度の合計を $f$。等分配則より内部エネルギーは $U=\dfrac{f}{2}\bar R T$（質量基準なら $u=\dfrac{f}{2}RT$）。

## ステップ1: 内部エネルギーから cv

$u=\dfrac{f}{2}RT$ を温度微分する：

$$
c_v = \frac{du}{dT} = \frac{f}{2}R
$$

## ステップ2: マイヤーで cp

[マイヤーの関係](#/mayer) $c_p=c_v+R$ より、

$$
c_p = \frac{f}{2}R + R = \frac{f+2}{2}R
$$

## ステップ3: 比熱比 κ

$$
\kappa = \frac{c_p}{c_v} = \frac{(f+2)/2}{f/2} = \frac{f+2}{f}
$$

## ステップ4: 分子ごとに当てはめる

- **単原子分子**（He, Ar）: 並進のみ $f=3$ → $c_v=\tfrac32 R$、$\kappa=\dfrac{5}{3}\approx1.67$
- **2原子分子**（空気・$\mathrm{N_2,O_2}$, 常温）: 並進3＋回転2で $f=5$ → $c_v=\tfrac52 R$、$\kappa=\dfrac{7}{5}=1.4$

## 結論

$$
\boxed{\,c_v=\frac{f}{2}R,\qquad \kappa=\frac{f+2}{f}\,}
$$

> **ポイント**: 院試で空気を扱うときの $\kappa=1.4$ はここ由来。常温では2原子分子の**振動自由度は凍結**して効かない（$f=5$ で止める）ことに注意——高温だと振動が目覚めて $\kappa$ が下がる。
